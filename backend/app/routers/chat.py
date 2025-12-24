from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, Conversation, Message, Agent, Project
from app.models import ChatRequest, MessageResponse
from app.services.ollama import ollama_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/stream")
async def chat_stream(chat_request: ChatRequest, db: Session = Depends(get_db)):
    """Send a message and get streaming response."""
    
    # Verify project exists
    project = db.query(Project).filter(Project.id == chat_request.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Verify agent exists
    agent = db.query(Agent).filter(Agent.id == chat_request.agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Get or create conversation
    if chat_request.conversation_id:
        conversation = db.query(Conversation).filter(
            Conversation.id == chat_request.conversation_id,
            Conversation.project_id == chat_request.project_id
        ).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        # Create new conversation
        conversation = Conversation(
            project_id=chat_request.project_id,
            agent_id=chat_request.agent_id
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
    
    # Save user message
    user_message = Message(
        conversation_id=conversation.id,
        role="user",
        content=chat_request.message
    )
    db.add(user_message)
    db.commit()
    
    # Get conversation history
    messages = db.query(Message).filter(
        Message.conversation_id == conversation.id
    ).order_by(Message.created_at).all()
    
    # Convert to Ollama format
    ollama_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]
    
    # Stream response from Ollama
    async def generate():
        assistant_content = ""
        
        # Send conversation ID first
        yield f"data: {{'conversation_id': {conversation.id}}}\n\n"
        
        try:
            async for chunk in ollama_service.generate_stream(
                model=agent.base_model,
                messages=ollama_messages,
                temperature=agent.temperature,
                max_tokens=agent.max_tokens,
                system_prompt=agent.system_prompt
            ):
                assistant_content += chunk
                yield f"data: {{'content': '{chunk}'}}\n\n"
            
            # Save assistant message
            assistant_message = Message(
                conversation_id=conversation.id,
                role="assistant",
                content=assistant_content
            )
            db.add(assistant_message)
            db.commit()
            
            yield f"data: {{'done': true}}\n\n"
            
        except Exception as e:
            yield f"data: {{'error': '{str(e)}'}}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")


@router.get("/conversations/{project_id}", response_model=List[dict])
def get_conversations(project_id: int, db: Session = Depends(get_db)):
    """Get all conversations for a project."""
    conversations = db.query(Conversation).filter(
        Conversation.project_id == project_id
    ).all()
    
    result = []
    for conv in conversations:
        messages = db.query(Message).filter(
            Message.conversation_id == conv.id
        ).order_by(Message.created_at).all()
        
        result.append({
            "id": conv.id,
            "agent_id": conv.agent_id,
            "created_at": conv.created_at,
            "messages": [
                {
                    "id": msg.id,
                    "role": msg.role,
                    "content": msg.content,
                    "created_at": msg.created_at
                }
                for msg in messages
            ]
        })
    
    return result


@router.get("/messages/{conversation_id}", response_model=List[MessageResponse])
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    """Get all messages in a conversation."""
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at).all()
    
    return messages

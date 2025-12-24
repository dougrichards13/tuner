import httpx
from typing import AsyncGenerator, Dict, Any, List
from app.config import settings
import json


class OllamaService:
    """Service for interacting with Ollama API."""
    
    def __init__(self):
        self.base_url = settings.ollama_base_url
        self.timeout = settings.ollama_timeout
    
    async def generate_stream(
        self,
        model: str,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 2048,
        system_prompt: str | None = None,
    ) -> AsyncGenerator[str, None]:
        """
        Generate streaming response from Ollama.
        
        Args:
            model: Model name (e.g., 'llama2', 'mistral')
            messages: List of message dicts with 'role' and 'content'
            temperature: Sampling temperature
            max_tokens: Max tokens to generate
            system_prompt: Optional system prompt
        
        Yields:
            Chunks of generated text
        """
        url = f"{self.base_url}/api/chat"
        
        # Build request payload
        payload = {
            "model": model,
            "messages": messages,
            "stream": True,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
            }
        }
        
        # Add system message if provided
        if system_prompt:
            payload["messages"].insert(0, {
                "role": "system",
                "content": system_prompt
            })
        
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            async with client.stream("POST", url, json=payload) as response:
                response.raise_for_status()
                
                async for line in response.aiter_lines():
                    if line:
                        try:
                            data = json.loads(line)
                            if "message" in data and "content" in data["message"]:
                                chunk = data["message"]["content"]
                                if chunk:
                                    yield chunk
                        except json.JSONDecodeError:
                            continue
    
    async def list_models(self) -> List[Dict[str, Any]]:
        """List available Ollama models."""
        url = f"{self.base_url}/api/tags"
        
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return data.get("models", [])
    
    async def pull_model(self, model_name: str) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Pull/download a model from Ollama.
        
        Args:
            model_name: Name of model to pull
            
        Yields:
            Progress updates as dicts
        """
        url = f"{self.base_url}/api/pull"
        payload = {"name": model_name, "stream": True}
        
        async with httpx.AsyncClient(timeout=3600) as client:  # 1 hour timeout for downloads
            async with client.stream("POST", url, json=payload) as response:
                response.raise_for_status()
                
                async for line in response.aiter_lines():
                    if line:
                        try:
                            yield json.loads(line)
                        except json.JSONDecodeError:
                            continue
    
    async def delete_model(self, model_name: str) -> bool:
        """Delete a model from Ollama."""
        url = f"{self.base_url}/api/delete"
        payload = {"name": model_name}
        
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.delete(url, json=payload)
            return response.status_code == 200


# Singleton instance
ollama_service = OllamaService()

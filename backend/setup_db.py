"""
Setup script to initialize the database with default project and agent.
Run this once after first install.
"""
from app.database import init_db, SessionLocal, Project, Agent

def setup():
    """Initialize database with default data."""
    print("Initializing database...")
    init_db()
    
    db = SessionLocal()
    
    try:
        # Check if we already have data
        existing_projects = db.query(Project).count()
        if existing_projects > 0:
            print("Database already has data. Skipping setup.")
            return
        
        # Create default project
        project = Project(
            name="My First Project",
            description="Default project for getting started"
        )
        db.add(project)
        
        # Create default agent
        agent = Agent(
            name="General Assistant",
            description="A helpful general-purpose AI assistant",
            base_model="llama3.2",
            system_prompt="You are a helpful AI assistant. Be concise and friendly.",
            temperature=0.7,
            max_tokens=2048
        )
        db.add(agent)
        
        db.commit()
        
        print("✓ Created default project: 'My First Project'")
        print("✓ Created default agent: 'General Assistant'")
        print("\nSetup complete! You can now start the server.")
        print("\nIMPORTANT: Make sure Ollama is running and you have the 'llama2' model")
        print("           (or update the agent's base_model to match your installed models)")
        
    except Exception as e:
        print(f"Error during setup: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    setup()

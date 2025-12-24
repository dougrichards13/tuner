from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    """Application settings."""
    
    # App info
    app_name: str = "NeuroLine"
    app_version: str = "0.1.0"
    app_description: str = "AI Accelerator Tool by Smart Factory"
    contact_name: str = "Doug Richards"
    organization: str = "Smart Factory"
    
    # Server
    host: str = "127.0.0.1"
    port: int = 8000
    
    # Database
    database_url: str = "sqlite:///./data/ai_platform.db"
    
    # Ollama
    ollama_base_url: str = "http://localhost:11434"
    ollama_timeout: int = 300  # 5 minutes for generation
    
    # File uploads
    max_upload_size: int = 100 * 1024 * 1024  # 100MB
    upload_dir: Path = Path("./data/uploads")
    
    # CORS
    allowed_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"


settings = Settings()

# NeuroLine - Quick Start Guide

**AI Accelerator Tool by Smart Factory**  
**Contact:** Doug Richards

Get NeuroLine up and running in minutes!

## Prerequisites

Before you begin, ensure you have:

1. **Python 3.10+** installed
2. **Node.js 18+** installed
3. **Ollama** installed and running
   - Download from: https://ollama.ai
   - After installation, run: `ollama pull llama2` (or any model you prefer)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dougrichards13/tuner.git neuroline
cd neuroline
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with default data
python setup_db.py

# Start the FastAPI server
python -m app.main
```

The backend API should now be running at `http://localhost:8000`

**Note:** If you're using a different Ollama model than `llama2`, edit the agent configuration in the database or update `setup_db.py` before running it.

### 3. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend should now be running at `http://localhost:5173`

### 4. Start Chatting!

1. Open your browser to `http://localhost:5173`
2. You should see "My First Project" and "General Assistant" already selected
3. Type a message in the input box and hit Send
4. Watch the AI respond in real-time with streaming!

## Troubleshooting

### Backend Issues

**"Module not found" errors:**
- Make sure you're in the backend directory
- Activate your virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`

**"Connection refused" to Ollama:**
- Ensure Ollama is running: `ollama serve`
- Check Ollama is accessible at `http://localhost:11434`
- Test with: `ollama list` (should show your installed models)

**"Database is locked" error:**
- Close any other backend processes
- Delete `data/ai_platform.db` and run `setup_db.py` again

### Frontend Issues

**Blank page or errors:**
- Check browser console for errors (F12)
- Ensure backend is running at `http://localhost:8000`
- Try clearing browser cache and reloading

**CORS errors:**
- Backend should allow `http://localhost:5173` by default
- Check `backend/app/config.py` for allowed origins

**"Cannot connect to server":**
- Verify backend is running and accessible
- Check that port 8000 is not blocked by firewall

## Next Steps

### Add More Models

```bash
# Pull more Ollama models
ollama pull mistral
ollama pull codellama
ollama pull phi
```

Then create new agents in the database or via the API:

```python
# Using the API
curl -X POST http://localhost:8000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Code Assistant",
    "description": "Specialized coding assistant",
    "base_model": "codellama",
    "system_prompt": "You are an expert programming assistant.",
    "temperature": 0.3,
    "max_tokens": 4096
  }'
```

### Add More Projects

```bash
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Work Project",
    "description": "Professional work-related conversations"
  }'
```

## API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

## Development

- Backend hot-reload is enabled by default (FastAPI with `--reload`)
- Frontend hot-reload via Vite
- Make changes and see them instantly!

## Getting Help

- Check the main README.md for architecture details
- Review the technical design plan
- Open an issue on GitHub: https://github.com/dougrichards13/tuner/issues

Enjoy your local AI platform! 🚀

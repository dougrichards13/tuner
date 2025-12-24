# Local AI Platform (Tuner)

A sophisticated, 100% local AI platform that replaces Ollama's interface with advanced features for project management, specialized agents, and model tuning.

## Features

- **Project-based Workspaces** - Organize conversations in isolated projects (like Perplexity Spaces)
- **Specialized Agents** - Create AI agents with enforced capability boundaries and custom configurations
- **Model Tuning Interface** - Configure parameters, manage training data, implement RAG pipelines
- **Multi-modal Support** - Text, files, images, and voice input (planned)
- **App Store Marketplace** - Browse/install models and share agent configurations (planned)
- **MCP Server Integration** - Dynamic model switching and tool integration (planned)
- **100% Local** - All data stays on your machine, works completely offline

## Technology Stack

### Backend
- FastAPI (Python) - REST API server
- SQLite - Local database
- Ollama API - Model inference
- ChromaDB - Vector store (planned)
- Whisper - Voice transcription (planned)

### Frontend
- React 18 + TypeScript
- Vite - Build tool
- TailwindCSS + shadcn/ui - UI components
- Zustand - State management
- React Query - Server state

## Project Structure

```
local-ai-platform/
├── backend/          # FastAPI server
│   ├── app/
│   │   ├── models/   # Pydantic schemas
│   │   ├── routers/  # API endpoints
│   │   ├── services/ # Business logic
│   │   └── utils/    # Helper functions
│   └── requirements.txt
├── frontend/         # React application
├── data/            # Local data storage
│   ├── chromadb/    # Vector store
│   └── uploads/     # User files
└── README.md
```

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Ollama (installed and running)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The UI will be available at `http://localhost:5173`

## Current Status

**Phase 1: Foundation (MVP)** - In Progress
- ✅ Project structure created
- ✅ Backend API with FastAPI
- ✅ SQLite database models
- ✅ Ollama integration
- ✅ Core endpoints (projects, agents, chat)
- 🚧 Frontend React application
- 🚧 Basic chat interface

## Development Phases

1. **Phase 1: Foundation (MVP)** - Basic chat with single project/agent
2. **Phase 2: Project Management** - Multiple projects and switching
3. **Phase 3: Agent Specialization** - Custom agents with boundaries
4. **Phase 4: RAG & Knowledge Base** - Document upload and embeddings
5. **Phase 5: Multi-Modal** - Images, voice, file attachments
6. **Phase 6: MCP Server** - Dynamic model routing
7. **Phase 7: App Store** - Model marketplace
8. **Phase 8: Polish** - Performance and UX improvements

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

## License

MIT

## Contributing

This is a personal project, but feel free to fork and adapt for your own use!

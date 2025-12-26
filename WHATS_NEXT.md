# NeuroLine - What's Next

**AI Accelerator Tool by Smart Factory**  
**Last Updated:** December 26, 2024

## Current Status

### ✅ Completed (Phase 1 & 2)
- **Backend Foundation**
  - FastAPI server with SQLite database
  - Ollama API integration with streaming
  - RESTful endpoints for projects, agents, and chat
  - Database models for Projects, Agents, Conversations, Messages
  
- **Frontend Foundation**
  - React + TypeScript with Vite
  - TailwindCSS styling
  - React Query for server state
  - Zustand for local state management
  
- **Project Management**
  - Full CRUD UI for projects
  - Project selector in chat interface
  
- **Agent Management**
  - Full CRUD UI for agents
  - Configuration: model, temperature, max tokens, system prompts
  - Agent selector in chat interface
  
- **Chat Interface**
  - Real-time streaming responses
  - Message display with timestamps
  - Basic text input
  
- **UI/UX**
  - Smart Factory branded sidebar navigation
  - Three-page layout: Chat, Projects, Agents
  - Professional NeuroLine branding throughout

---

## 🚀 Next Steps (Priority Order)

### IMMEDIATE (Complete Phase 2)

#### 1. Conversation History Management
**Status:** Not Started  
**Priority:** HIGH  
**Effort:** Medium

**Tasks:**
- [ ] Add conversation history panel to Chat page (left sidebar or dropdown)
- [ ] Load and display all conversations for selected project
- [ ] Implement conversation switching
- [ ] Add "New Conversation" button
- [ ] Persist conversation selection in state
- [ ] Show conversation preview (first message or timestamp)

**Benefits:** Users can manage multiple conversations per project, switch between contexts

#### 2. Enhanced Chat UX
**Status:** Not Started  
**Priority:** HIGH  
**Effort:** Small

**Tasks:**
- [ ] Add loading indicators during streaming
- [ ] Improve error handling with user-friendly messages
- [ ] Add retry button for failed messages
- [ ] Show conversation metadata (created time, message count)
- [ ] Add "Copy message" button for AI responses
- [ ] Implement markdown rendering for code blocks

**Benefits:** Better user experience, professional polish

---

### SHORT TERM (Phase 3: Agent Specialization)

#### 3. Agent Capability Boundaries
**Status:** Not Started  
**Priority:** MEDIUM  
**Effort:** Large

**Tasks:**
- [ ] Implement pre-flight query validation
- [ ] Create domain classification service
- [ ] Add capability tags to agents (e.g., "code_only", "writing_only")
- [ ] Build validation rules engine
- [ ] Add rejection messages when out-of-scope
- [ ] Create agent templates for common specializations

**Benefits:** Enforced agent specialization, better quality responses

#### 4. Agent Templates & Presets
**Status:** Not Started  
**Priority:** MEDIUM  
**Effort:** Small

**Tasks:**
- [ ] Create preset configurations:
  - Python Copilot
  - SQL Expert
  - Technical Writer
  - Code Reviewer
  - Executive Communication Assistant
- [ ] Add "Create from Template" option
- [ ] Allow exporting/importing agent configs as JSON

**Benefits:** Quick setup for common use cases

---

### MEDIUM TERM (Phase 4: RAG & Knowledge Base)

#### 5. Document Upload & Processing
**Status:** Not Started  
**Priority:** MEDIUM  
**Effort:** Large

**Tasks:**
- [ ] Add file upload UI component
- [ ] Backend endpoint for document upload
- [ ] Implement document parsers (PDF, MD, TXT, DOCX, code files)
- [ ] Store documents with metadata
- [ ] Associate documents with agents
- [ ] Add document browser/manager UI

**Benefits:** Custom knowledge bases per agent

#### 6. ChromaDB Integration for RAG
**Status:** Not Started  
**Priority:** MEDIUM  
**Effort:** Large

**Tasks:**
- [ ] Set up ChromaDB connection
- [ ] Implement document chunking strategy
- [ ] Add embedding generation pipeline
- [ ] Build retrieval service
- [ ] Integrate RAG into chat flow
- [ ] Add relevance scoring
- [ ] Create knowledge base version control

**Benefits:** Context-aware responses with custom data

---

### LONG TERM (Phases 5-8)

#### 7. Multi-Modal Support (Phase 5)
**Status:** Not Started  
**Priority:** LOW  
**Effort:** Large

**Tasks:**
- [ ] Image upload and vision model support
- [ ] Whisper integration for voice transcription
- [ ] Audio file upload
- [ ] Drag-and-drop file support
- [ ] Multi-modal message display

#### 8. MCP Server Integration (Phase 6)
**Status:** Not Started  
**Priority:** LOW  
**Effort:** X-Large

**Tasks:**
- [ ] Design MCP server architecture
- [ ] Implement dynamic model switching
- [ ] Add tool integration framework
- [ ] Build context sharing between agents
- [ ] Create resource management system

#### 9. Model Marketplace (Phase 7)
**Status:** Not Started  
**Priority:** LOW  
**Effort:** Medium

**Tasks:**
- [ ] UI for browsing available Ollama models
- [ ] One-click model installation
- [ ] Model metadata display (size, speed, capabilities)
- [ ] Rating/review system
- [ ] Model search and filtering

#### 10. Performance & Polish (Phase 8)
**Status:** Not Started  
**Priority:** LOW  
**Effort:** Medium

**Tasks:**
- [ ] Optimize database queries
- [ ] Add pagination for conversations
- [ ] Implement lazy loading
- [ ] Add keyboard shortcuts
- [ ] Create onboarding tutorial
- [ ] Performance profiling and optimization
- [ ] Comprehensive error logging

---

## 📊 Technical Debt & Improvements

### Backend
- [ ] Add proper error handling middleware
- [ ] Implement API rate limiting
- [ ] Add request validation
- [ ] Create comprehensive unit tests
- [ ] Add API versioning
- [ ] Implement proper logging system
- [ ] Add health check endpoints

### Frontend
- [ ] Add proper TypeScript strict mode
- [ ] Implement error boundaries
- [ ] Add loading states for all API calls
- [ ] Create reusable component library
- [ ] Add E2E tests with Playwright
- [ ] Optimize bundle size
- [ ] Add PWA support for offline mode

### Database
- [ ] Add database migrations (Alembic)
- [ ] Implement soft deletes
- [ ] Add indexes for performance
- [ ] Create backup/restore utilities

### DevOps
- [ ] Create Docker containers
- [ ] Add docker-compose for easy setup
- [ ] CI/CD pipeline for automated testing
- [ ] Create deployment scripts

---

## 🎯 Success Metrics

### User Experience
- [ ] Chat response time < 30s for 7B models
- [ ] UI interaction latency < 100ms
- [ ] File upload processing < 5s for 10MB
- [ ] Voice transcription real-time factor < 0.5

### Technical
- [ ] Support 100+ projects without performance degradation
- [ ] 95%+ uptime in development environment
- [ ] < 5% error rate for API calls
- [ ] Database operations < 50ms

### Adoption (Internal Team)
- [ ] 10+ active users
- [ ] 50+ conversations created
- [ ] 5+ custom agents configured
- [ ] Positive feedback from 80% of users

---

## 🤝 Contributing & Feedback

**Contact:** Doug Richards  
**Organization:** Smart Factory  
**Program:** AI Accelerator

For feature requests, bug reports, or general feedback, please reach out to Doug Richards.

---

## 📝 Notes

- This roadmap is living and will be updated as priorities shift
- Features may be added, removed, or reprioritized based on user feedback
- Focus is on delivering value to Smart Factory's internal teams
- All development maintains the 100% local/offline requirement

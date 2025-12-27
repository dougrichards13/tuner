# NeuroLine Projects Page Redesign

**Vision:** Transform projects from simple containers into active workspaces where users collaborate with AI agents to build solutions.

---

## Current vs. New Vision

### ❌ Current (Wrong)
- Projects = Simple folders for chat history
- No context about what user is building
- No file/document management
- No workflow guidance
- Agents are just chat bots

### ✅ New (Correct)
- Projects = **Active work environments** for building solutions
- Rich context (requirements, designs, files, knowledge)
- Agent acts as **personal assistant + secure workspace**
- Workflow-driven with best practices
- Offline-first with local knowledge base
- Seamless start/stop of work sessions

---

## User Story Example

**Project:** "Annual Insurance Policy Calculator"

**User Journey:**
1. **Create Project** → User names it, selects project type (web app, API, documentation, etc.)
2. **Upload Requirements** → Drag/drop specs, screenshots, notes
3. **Capture Ideas** → Quick notes, voice memos, sketches
4. **Design Phase** → Upload architecture diagrams, ERDs, wireframes
5. **Development** → Chat with specialized agents (Python, Frontend, SQL)
6. **Iterate** → Agents remember context, suggest improvements
7. **Pause/Resume** → Close project, come back later - agent remembers everything

---

## Projects Page Features

### Project Card Enhanced
```
┌─────────────────────────────────────────┐
│ 🏗️ Insurance Policy Calculator          │
│                                         │
│ Type: Web Application                   │
│ Status: 🟢 Active | ⏸️ Paused | ✅ Done │
│                                         │
│ Files: 12 | Conversations: 8           │
│ Last worked: 2 hours ago                │
│                                         │
│ Agents: Python Dev, UI Designer        │
│                                         │
│ [Open Project] [Archive]                │
└─────────────────────────────────────────┘
```

### Project Types (Templates)
- **Web Application** (Frontend + Backend)
- **API Development** (REST, GraphQL)
- **Data Analysis** (Python, R, Jupyter)
- **Documentation** (Technical writing)
- **Database Design** (Schema, queries)
- **General** (Custom workflow)

### Project Workspace Layout

```
┌─────────────────────────────────────────────────────────┐
│  Insurance Policy Calculator                            │
│  [Requirements] [Files] [Designs] [Chat] [Settings]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📋 Requirements Tab:                                   │
│  • Upload specs, user stories                          │
│  • Quick notes/ideas                                   │
│  • Project goals                                       │
│                                                         │
│  📁 Files Tab:                                          │
│  • Source code                                         │
│  • Documentation                                       │
│  • Test files                                          │
│  • Organized by type                                   │
│                                                         │
│  🎨 Designs Tab:                                        │
│  • Wireframes                                          │
│  • Architecture diagrams                               │
│  • Database schemas                                    │
│  • UI mockups                                          │
│                                                         │
│  💬 Chat Tab:                                           │
│  • Select agent for task                               │
│  • Context-aware conversations                         │
│  • Agent sees all project files                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema Changes

```sql
-- Enhanced Projects Table
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    project_type TEXT,  -- NEW: 'web_app', 'api', 'data_analysis', etc.
    status TEXT DEFAULT 'active',  -- NEW: 'active', 'paused', 'completed', 'archived'
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    last_accessed TIMESTAMP,  -- NEW: For "last worked"
    settings JSON  -- NEW: Project-specific settings
);

-- NEW: Project Files Table
CREATE TABLE project_files (
    id INTEGER PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT,  -- 'requirement', 'design', 'code', 'doc', 'other'
    file_size INTEGER,
    mime_type TEXT,
    uploaded_at TIMESTAMP,
    metadata JSON
);

-- NEW: Project Requirements Table
CREATE TABLE project_requirements (
    id INTEGER PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    requirement_type TEXT,  -- 'feature', 'constraint', 'goal', 'note'
    title TEXT,
    content TEXT,
    priority TEXT,  -- 'high', 'medium', 'low'
    status TEXT,  -- 'todo', 'in_progress', 'done'
    created_at TIMESTAMP
);

-- NEW: Project Knowledge Base
CREATE TABLE project_knowledge (
    id INTEGER PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    content TEXT,
    source TEXT,  -- 'user_input', 'file_extract', 'agent_learned'
    embedding BLOB,  -- For RAG
    created_at TIMESTAMP
);
```

---

## Workflow Best Practices

### For Developers
1. **Version Control Integration** (future)
   - Git status in project view
   - Commit messages from agent suggestions
   
2. **Code Organization**
   - Proper file structure
   - Linting/formatting integration
   - Test file management

3. **Documentation**
   - Auto-generate docs from code
   - Keep README updated
   - API documentation

### For Non-Developers
1. **Guided Workflows**
   - Step-by-step project creation
   - Templates with pre-filled structure
   - Tooltips and help text

2. **Plain Language**
   - No technical jargon
   - Visual progress indicators
   - Simple file organization

3. **Safety Rails**
   - Confirmation dialogs
   - Undo capabilities
   - Auto-save everything

---

## Agent Workflow Integration

### Context Awareness
```javascript
// When user opens chat, agent knows:
{
  project: "Insurance Policy Calculator",
  type: "web_application",
  requirements: [...],
  files: [...],
  recent_activity: [...],
  blockers: [...]
}
```

### Specialized Agent Suggestions
```
User uploads Python file → System suggests "Python Dev" agent
User uploads wireframe → System suggests "UI Designer" agent
User asks about database → System suggests "SQL Expert" agent
```

### Continuous Learning
- Agent remembers past decisions
- Learns project patterns
- Suggests improvements based on project history

---

## Offline-First Architecture

### Local Knowledge Storage
- All files stored locally
- Embeddings generated locally (future)
- No cloud dependencies

### Session Management
- Auto-save project state
- Resume exactly where user left off
- No data loss on disconnect

### Sync Strategy (Future)
- When connected to Smart Factory server:
  - Optional backup
  - Team collaboration
  - Shared agent knowledge
- Always works offline first

---

## Phase-by-Phase Implementation

### Phase 1: Enhanced Project Structure
- [ ] Add project types/templates
- [ ] Add project status (active/paused/done)
- [ ] Track last accessed time
- [ ] Improve project card UI

### Phase 2: File Management
- [ ] File upload component
- [ ] File browser in project workspace
- [ ] File categorization (requirements, designs, code)
- [ ] File preview

### Phase 3: Requirements Management
- [ ] Requirements tab
- [ ] Quick notes capture
- [ ] Goals/objectives tracking
- [ ] Priority management

### Phase 4: Workspace Layout
- [ ] Tabbed interface (Requirements, Files, Designs, Chat)
- [ ] Context-aware agent selection
- [ ] Project dashboard

### Phase 5: Context-Aware Agents
- [ ] Agents see project context
- [ ] Intelligent agent suggestions
- [ ] Project-specific prompts

### Phase 6: Advanced Features
- [ ] Version control integration
- [ ] Team collaboration
- [ ] Server sync capabilities

---

## Immediate Next Steps

1. **Update Database Schema** → Add new tables and columns
2. **Redesign Projects Page** → Card-based with rich metadata
3. **Create Project Workspace View** → New page with tabs
4. **Build File Upload** → Backend and frontend
5. **Enhance Project Creation** → Add type selection, templates

---

## Success Metrics

### User Experience
- Time to start new project < 2 minutes
- File upload/organization < 30 seconds
- Context switches (pause/resume) seamless
- Zero learning curve for non-developers

### Developer Productivity
- 50% faster project setup
- Agent suggestions reduce context switching
- Code organization improves quality

### System Performance
- All operations work offline
- File operations < 1 second
- Project loads < 500ms
- No data loss, ever

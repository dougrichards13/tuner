import axios from "axios";
import type { Project, Agent, Message, Conversation, ChatRequest } from "../types";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Projects
export const projectsApi = {
  list: () => api.get<Project[]>("/api/projects"),
  get: (id: number) => api.get<Project>(`/api/projects/${id}`),
  create: (data: Partial<Project>) => api.post<Project>("/api/projects", data),
  update: (id: number, data: Partial<Project>) =>
    api.put<Project>(`/api/projects/${id}`, data),
  delete: (id: number) => api.delete(`/api/projects/${id}`),
};

// Agents
export const agentsApi = {
  list: () => api.get<Agent[]>("/api/agents"),
  get: (id: number) => api.get<Agent>(`/api/agents/${id}`),
  create: (data: Partial<Agent>) => api.post<Agent>("/api/agents", data),
  update: (id: number, data: Partial<Agent>) =>
    api.put<Agent>(`/api/agents/${id}`, data),
  delete: (id: number) => api.delete(`/api/agents/${id}`),
};

// Chat
export const chatApi = {
  getConversations: (projectId: number) =>
    api.get<Conversation[]>(`/api/chat/conversations/${projectId}`),
  getMessages: (conversationId: number) =>
    api.get<Message[]>(`/api/chat/messages/${conversationId}`),
  sendMessage: (data: ChatRequest) => {
    // Return EventSource for streaming
    return new EventSource(
      `${API_BASE_URL}/api/chat/stream?` +
        new URLSearchParams({
          message: data.message,
          project_id: data.project_id.toString(),
          agent_id: data.agent_id.toString(),
          ...(data.conversation_id && {
            conversation_id: data.conversation_id.toString(),
          }),
        })
    );
  },
};

export default api;

export interface Project {
  id: number;
  name: string;
  description?: string;
  project_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_accessed: string;
}

export interface ProjectTypeMetadata {
  label: string;
  description: string;
  icon: string;
  suggested_agents: string[];
}

export interface ProjectStatusMetadata {
  label: string;
  color: string;
  icon: string;
}

export interface Agent {
  id: number;
  name: string;
  description?: string;
  base_model: string;
  system_prompt?: string;
  temperature: number;
  max_tokens: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  agent_id: number;
  created_at: string;
  messages: Message[];
}

export interface ChatRequest {
  message: string;
  project_id: number;
  agent_id: number;
  conversation_id?: number;
}

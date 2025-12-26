import { create } from "zustand";
import type { Project, Agent, Message, Conversation } from "../types";

interface AppState {
  // Current selections
  currentProject: Project | null;
  currentAgent: Agent | null;
  currentConversationId: number | null;
  conversations: Conversation[];
  messages: Message[];
  
  // Streaming state
  isStreaming: boolean;
  streamingMessage: string;
  
  // Actions
  setCurrentProject: (project: Project | null) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  setCurrentConversationId: (id: number | null) => void;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setStreamingMessage: (message: string) => void;
  appendStreamingMessage: (chunk: string) => void;
  clearStreamingMessage: () => void;
  startNewConversation: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentProject: null,
  currentAgent: null,
  currentConversationId: null,
  conversations: [],
  messages: [],
  isStreaming: false,
  streamingMessage: "",
  
  // Actions
  setCurrentProject: (project) => set({ 
    currentProject: project,
    currentConversationId: null,
    conversations: [],
    messages: [],
  }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  setConversations: (conversations) => set({ conversations }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setStreamingMessage: (message) => set({ streamingMessage: message }),
  appendStreamingMessage: (chunk) =>
    set((state) => ({ streamingMessage: state.streamingMessage + chunk })),
  clearStreamingMessage: () => set({ streamingMessage: "" }),
  startNewConversation: () => set({ 
    currentConversationId: null,
    messages: [],
    streamingMessage: "",
  }),
}));

import { create } from "zustand";
import type { Project, Agent, Message } from "../types";

interface AppState {
  // Current selections
  currentProject: Project | null;
  currentAgent: Agent | null;
  currentConversationId: number | null;
  messages: Message[];
  
  // Streaming state
  isStreaming: boolean;
  streamingMessage: string;
  
  // Actions
  setCurrentProject: (project: Project | null) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  setCurrentConversationId: (id: number | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setStreamingMessage: (message: string) => void;
  appendStreamingMessage: (chunk: string) => void;
  clearStreamingMessage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentProject: null,
  currentAgent: null,
  currentConversationId: null,
  messages: [],
  isStreaming: false,
  streamingMessage: "",
  
  // Actions
  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setStreamingMessage: (message) => set({ streamingMessage: message }),
  appendStreamingMessage: (chunk) =>
    set((state) => ({ streamingMessage: state.streamingMessage + chunk })),
  clearStreamingMessage: () => set({ streamingMessage: "" }),
}));

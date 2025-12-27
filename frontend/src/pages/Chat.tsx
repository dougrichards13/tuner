import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../stores/useAppStore";
import { projectsApi, agentsApi, chatApi } from "../services/api";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ConversationList } from "../components/ConversationList";
import type { Message } from "../types";

export const Chat: React.FC = () => {
  const {
    currentProject,
    currentAgent,
    currentConversationId,
    conversations,
    messages,
    isStreaming,
    streamingMessage,
    setCurrentProject,
    setCurrentAgent,
    setCurrentConversationId,
    setConversations,
    setMessages,
    clearMessages,
    addMessage,
    setIsStreaming,
    appendStreamingMessage,
    clearStreamingMessage,
    startNewConversation,
  } = useAppStore();

  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch projects
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await projectsApi.list();
      return response.data;
    },
  });

  // Fetch agents
  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await agentsApi.list();
      return response.data;
    },
  });

  // Fetch conversations for current project
  const { data: conversationsData } = useQuery({
    queryKey: ["conversations", currentProject?.id],
    queryFn: async () => {
      if (!currentProject) return [];
      const response = await chatApi.getConversations(currentProject.id);
      return response.data;
    },
    enabled: !!currentProject,
  });

  // Update conversations when data changes
  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }
  }, [conversationsData, setConversations]);

  // Auto-select first project and agent if available
  useEffect(() => {
    if (projects && projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject, setCurrentProject]);

  useEffect(() => {
    if (agents && agents.length > 0 && !currentAgent) {
      setCurrentAgent(agents[0]);
    }
  }, [agents, currentAgent, setCurrentAgent]);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === currentConversationId);
      if (conversation) {
        setMessages(conversation.messages);
      }
    }
  }, [currentConversationId, conversations]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  const handleSelectConversation = (id: number) => {
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setCurrentConversationId(id);
      setMessages(conversation.messages);
      clearStreamingMessage();
    }
  };

  const handleNewConversation = () => {
    startNewConversation();
  };

  const handleSendMessage = (message: string) => {
    if (!currentProject || !currentAgent) return;

    setIsStreaming(true);
    clearStreamingMessage();

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now(),
      conversation_id: currentConversationId || 0,
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    };
    addMessage(userMessage);

    // Create EventSource for streaming
    const eventSource = new EventSource(
      `http://localhost:8000/api/chat/stream?` +
        new URLSearchParams({
          message,
          project_id: currentProject.id.toString(),
          agent_id: currentAgent.id.toString(),
          ...(currentConversationId && {
            conversation_id: currentConversationId.toString(),
          }),
        }).toString()
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.conversation_id && !currentConversationId) {
        setCurrentConversationId(data.conversation_id);
      }

      if (data.content) {
        appendStreamingMessage(data.content);
      }

      if (data.done) {
        // Save assistant message
        const assistantMessage: Message = {
          id: Date.now(),
          conversation_id: data.conversation_id || currentConversationId || 0,
          role: "assistant",
          content: streamingMessage,
          created_at: new Date().toISOString(),
        };
        addMessage(assistantMessage);
        clearStreamingMessage();
        setIsStreaming(false);
        eventSource.close();
      }

      if (data.error) {
        console.error("Stream error:", data.error);
        setIsStreaming(false);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setIsStreaming(false);
      eventSource.close();
    };
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Conversation List Sidebar */}
      {showConversations && (
        <div className="w-80 flex-shrink-0">
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              {/* Toggle Conversations Button */}
              <button
                onClick={() => setShowConversations(!showConversations)}
                className="p-2 bg-slate-700/30 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-all"
                title={showConversations ? "Hide conversations" : "Show conversations"}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex gap-3">
                {/* Project Selector */}
                <select
                  value={currentProject?.id || ""}
                  onChange={(e) => {
                    const project = projects?.find(
                      (p) => p.id === Number(e.target.value)
                    );
                    setCurrentProject(project || null);
                  }}
                  className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                >
                  <option value="">Select Project</option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>

                {/* Agent Selector */}
                <select
                  value={currentAgent?.id || ""}
                  onChange={(e) => {
                    const agent = agents?.find(
                      (a) => a.id === Number(e.target.value)
                    );
                    setCurrentAgent(agent || null);
                  }}
                  className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                >
                  <option value="">Select Agent</option>
                  {agents?.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && !streamingMessage && (
            <div className="flex items-center justify-center h-full text-slate-500">
              {currentConversationId
                ? "This conversation is empty"
                : "Start a conversation by typing a message below"}
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Streaming message */}
          {streamingMessage && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[70%] rounded-lg px-4 py-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
                <div className="text-sm whitespace-pre-wrap text-slate-300">
                  {streamingMessage}
                  <span className="inline-block w-1 h-4 ml-1 bg-blue-400 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={!currentProject || !currentAgent || isStreaming}
        />
      </div>
    </div>
  );
};

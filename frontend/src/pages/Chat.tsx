import { useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAppStore } from "../stores/useAppStore";
import { projectsApi, agentsApi, chatApi } from "../services/api";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import type { Message } from "../types";

export const Chat: React.FC = () => {
  const {
    currentProject,
    currentAgent,
    currentConversationId,
    messages,
    isStreaming,
    streamingMessage,
    setCurrentProject,
    setCurrentAgent,
    setCurrentConversationId,
    setMessages,
    addMessage,
    setIsStreaming,
    appendStreamingMessage,
    clearStreamingMessage,
  } = useAppStore();

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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NeuroLine</h1>
            <p className="text-xs text-gray-500">AI Accelerator by Smart Factory</p>
          </div>
          <div className="flex gap-4">
            {/* Project Selector */}
            <select
              value={currentProject?.id || ""}
              onChange={(e) => {
                const project = projects?.find(
                  (p) => p.id === Number(e.target.value)
                );
                setCurrentProject(project || null);
                setMessages([]);
                setCurrentConversationId(null);
              }}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !streamingMessage && (
          <div className="flex items-center justify-center h-full text-gray-500">
            Start a conversation by typing a message below
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Streaming message */}
        {streamingMessage && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[70%] rounded-lg px-4 py-2 bg-white border border-gray-200 text-gray-900">
              <div className="text-sm whitespace-pre-wrap">
                {streamingMessage}
                <span className="inline-block w-1 h-4 ml-1 bg-gray-900 animate-pulse" />
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
  );
};

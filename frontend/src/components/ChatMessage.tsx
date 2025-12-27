import type { Message } from "../types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 text-slate-300"
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        <div
          className={`text-xs mt-1.5 ${
            isUser ? "text-blue-200" : "text-slate-500"
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

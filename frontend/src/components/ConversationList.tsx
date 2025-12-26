import type { Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewConversation: () => void;
  onDeleteConversation?: (id: number) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) => {
  const getConversationPreview = (conversation: Conversation) => {
    if (conversation.messages.length === 0) {
      return "New conversation";
    }
    const firstMessage = conversation.messages[0];
    return firstMessage.content.slice(0, 50) + (firstMessage.content.length > 50 ? "..." : "");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onNewConversation}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No conversations yet. Start a new chat!
          </div>
        ) : (
          <div className="py-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`px-4 py-3 cursor-pointer border-l-4 transition-colors ${
                  currentConversationId === conversation.id
                    ? "bg-blue-50 border-blue-600"
                    : "border-transparent hover:bg-gray-100"
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {getConversationPreview(conversation)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.created_at)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {conversation.messages.length} msg{conversation.messages.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  {onDeleteConversation && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete this conversation?")) {
                          onDeleteConversation(conversation.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      title="Delete conversation"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

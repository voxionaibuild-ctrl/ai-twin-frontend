import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import type { Message } from "@shared/schema";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-20">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="max-w-xs sm:max-w-md">
              <div className="bg-ai-bubble rounded-2xl rounded-tl-md px-4 py-3">
                <p className="text-sm text-slate-800">
                  Hello! I'm your AI twin. I'm here to chat with you about anything you'd like to discuss. What's on your mind today?
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-1">Just now</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'ai' && (
                <div className="h-8 w-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="max-w-xs sm:max-w-md">
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-user-bubble text-white rounded-tr-md'
                      : 'bg-ai-bubble text-slate-800 rounded-tl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p
                  className={`text-xs text-slate-500 mt-1 ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-slate-600" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

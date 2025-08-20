import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import NavigationBar from "@/components/chat/navigation-bar";
import MessageList from "@/components/chat/message-list";
import MessageInput from "@/components/chat/message-input";
import { authService } from "@/lib/auth";
import type { Message } from "@shared/schema";

export default function ChatPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState(authService.getUser());

  useEffect(() => {
    // Verify authentication
    const checkAuth = async () => {
      const authenticatedUser = await authService.verifyToken();
      if (!authenticatedUser) {
        setLocation("/");
      } else {
        setUser(authenticatedUser);
      }
    };
    checkAuth();
  }, [setLocation]);

  const { data: messages = [], refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  const handleLogout = () => {
    authService.logout();
    setLocation("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar username={user.username} onLogout={handleLogout} />
      
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <MessageList messages={messages} />
        <MessageInput onMessageSent={refetchMessages} />
      </div>
    </div>
  );
}

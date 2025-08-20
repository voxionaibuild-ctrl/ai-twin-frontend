import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";
import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import { authService } from "@/lib/auth";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const user = await authService.verifyToken();
      if (user) {
        setLocation("/chat");
      }
    };
    checkAuth();
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">AI Twin Chat</h2>
          <p className="mt-2 text-sm text-slate-600">Connect with your personal AI companion</p>
        </div>

        {/* Auth Forms Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {isLogin ? (
            <LoginForm onToggle={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggle={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

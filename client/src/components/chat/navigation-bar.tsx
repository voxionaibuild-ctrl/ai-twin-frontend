import { MessageCircle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationBarProps {
  username: string;
  onLogout: () => void;
}

export default function NavigationBar({ username, onLogout }: NavigationBarProps) {
  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">AI Twin Chat</h1>
            <p className="text-xs text-slate-500">Your personal AI companion</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">{username}</span>
          </div>
          
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1 rounded-lg hover:bg-slate-100 transition duration-200"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

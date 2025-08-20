import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";
import { insertUserSchema, type InsertUser } from "@shared/schema";

interface SignupFormProps {
  onToggle: () => void;
}

const signupFormSchema = insertUserSchema.extend({
  password: insertUserSchema.shape.password.min(6, "Password must be at least 6 characters"),
});

export default function SignupForm({ onToggle }: SignupFormProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertUser>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: InsertUser) => {
    setIsLoading(true);
    try {
      await authService.signup(data.username, data.email, data.password);
      toast({
        title: "Account created!",
        description: "Welcome to AI Twin Chat. You can now start chatting with your AI companion.",
      });
      setLocation("/chat");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Create Account</h3>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            {...form.register("username")}
            className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {form.formState.errors.username && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...form.register("email")}
            className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            {...form.register("password")}
            className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center">
        <span className="text-sm text-slate-600">Already have an account? </span>
        <button
          onClick={onToggle}
          className="text-sm text-primary hover:text-indigo-700 font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

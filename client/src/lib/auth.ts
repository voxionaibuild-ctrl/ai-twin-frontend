import { apiRequest } from "./queryClient";

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = 'ai_twin_token';
const USER_KEY = 'ai_twin_user';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  logout(): void {
    this.removeToken();
    this.removeUser();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest('POST', '/api/auth/login', { email, password });
    const data = await response.json();
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest('POST', '/api/auth/signup', { username, email, password });
    const data = await response.json();
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  async verifyToken(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        this.logout();
        return null;
      }

      const data = await response.json();
      this.setUser(data.user);
      return data.user;
    } catch (error) {
      this.logout();
      return null;
    }
  },
};

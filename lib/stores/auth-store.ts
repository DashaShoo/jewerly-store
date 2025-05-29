"use client"

import { create } from "zustand";
import type { User, AuthState } from "@/lib/types";

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>,
  register: (email: string, password: string, name: string) => Promise<void>,
  logout: () => void,
  initializeAuth: () => void
}

// Мок токена
const mockLogin = async (email: string, password: string): Promise<User> => {
  // симуляция работы с сервером
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "user@example.com" && password === "password") {
    return {
      id: "1",
      email,
      name: "Dasha Shu",
      token: "mock-jwt-token-" + Date.now(),
    };
  }
  throw new Error("Invalid credentials");
}

const mockRegister = async (email: string, password: string, name: string): Promise<User> => {
  // симуляция работы с сервером
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: Date.now().toString(),
    email,
    name,
    token: "mock-jwt-token-" + Date.now(),
  };
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const user = await mockLogin(email, password);
      localStorage.setItem("auth-user", JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      const user = await mockRegister(email, password, name);
      localStorage.setItem("auth-user", JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("auth-user");
    localStorage.removeItem("cart-items");
    set({ user: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    const savedUser = localStorage.getItem("auth-user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        set({ user, isAuthenticated: true });
      } catch (error) {
        localStorage.removeItem("auth-user");
      }
    }
  },
}))

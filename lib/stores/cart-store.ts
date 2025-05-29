"use client"

import { create } from "zustand";
import type { CartItem, Product, CartState } from "@/lib/types";

interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void,
  removeItem: (productId: string) => void,
  updateQuantity: (productId: string, quantity: number) => void,
  clearCart: () => void,
  toggleCart: () => void,
  loadCart: () => void,
  getTotal: () => number,
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product: Product, quantity = 1, selectedSize?: string) => {
    const { items } = get();
    const existingItem = items.find((item) => item.product.id === product.id && item.selectedSize === selectedSize);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = items.map((item) =>
        item.product.id === product.id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    } else {
      newItems = [...items, { product, quantity, selectedSize }];
    }

    localStorage.setItem("cart-items", JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (productId: string) => {
    const { items } = get();
    const newItems = items.filter((item) => item.product.id !== productId);
    localStorage.setItem("cart-items", JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQuantity: (productId: string, quantity: number) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const newItems = items.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    localStorage.setItem("cart-items", JSON.stringify(newItems));
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem("cart-items");
    set({ items: [] });
  },

  toggleCart: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  loadCart: () => {
    const savedCart = localStorage.getItem("cart-items");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        set({ items });
      } catch (error) {
        localStorage.removeItem("cart-items");
      }
    }
  },

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}))

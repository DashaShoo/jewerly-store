"use client"

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useCartStore } from "@/lib/stores/cart-store";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ProductCatalog from "@/components/sections/product-catalog";
import AuthModal from "@/components/auth/auth-modal";

export default function HomePage() {
  const { initializeAuth } = useAuthStore();
  const { loadCart } = useCartStore();

  useEffect(() => {
    //инициализация авторизации и корзины из локального хранилища при запуске
    initializeAuth();
    loadCart();
  }, [initializeAuth, loadCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

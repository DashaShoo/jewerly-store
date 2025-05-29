"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { useModalStore } from "@/lib/stores/modal-store";
import CartSidebar from "@/components/cart/cart-sidebar";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleCart, getItemCount } = useCartStore();
  const { openAuthModal } = useModalStore();
  const itemCount = getItemCount();

  return (
    <>
      <header className="bg-emerald-950 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-5xl font-bold font-bumiku">Akteya</h1>
              <span className="ml-2 text-m  hidden sm:inline font-onest">- природные украшения</span>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="hidden sm:inline text-sm font-onest">{user?.name}</span>
                  <Button variant="ghost" size="sm" className="text-white hover:text-emerald-900" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">Выйти</span>
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" className="text-white hover:text-emerald-900" onClick={openAuthModal}>
                  <User className="h-4 w-4 mr-2" />
                  Войти
                </Button>
              )}

              <Button variant="ghost" className="text-white hover:text-emerald-900 relative" onClick={toggleCart}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{itemCount}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSidebar />
    </>
  )
}

"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/lib/stores/cart-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useModalStore } from "@/lib/stores/modal-store"

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const { openAuthModal } = useModalStore()

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openAuthModal()
      return
    }
    addItem(product)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.inStock <= 3 && (
            <Badge className="absolute top-2 right-2 bg-red-500">Осталось {product.inStock}</Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-onest text-xl mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          {product.size && <p className="text-sm text-gray-500 mb-2">Размеры: {product.size}</p>}
          <p className="text-2xl font-bold text-emerald-800">{formatPrice(product.price)}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onViewDetails}>
          <Eye className="h-4 w-4 mr-2" />
          Подробнее
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-slate-800 hover:bg-slate-700"
          onClick={handleAddToCart}
          disabled={product.inStock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />В корзину
        </Button>
      </CardFooter>
    </Card>
  )
}

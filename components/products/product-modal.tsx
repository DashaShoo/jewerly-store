"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { mockProducts } from "@/lib/data/products"
import { useCartStore } from "@/lib/stores/cart-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useModalStore } from "@/lib/stores/modal-store"

interface ProductModalProps {
  productId: string
  onClose: () => void
}

export default function ProductModal({ productId, onClose }: ProductModalProps) {
  const product = mockProducts.find((p) => p.id === productId)
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const { openAuthModal } = useModalStore()

  if (!product) return null

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openAuthModal()
      return
    }
    addItem(product)
    onClose()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-onest font-normal">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.inStock <= 3 && (
              <Badge className="absolute top-4 right-4 bg-red-500">Осталось {product.inStock}</Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-emerald-800 mb-2">{formatPrice(product.price)}</p>
              <Badge variant="outline" className="mb-4">
                {product.type}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.size && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Доступные размеры</h3>
                <p className="text-gray-600">{product.size}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Наличие</h3>
              <p className="text-gray-600">
                {product.inStock > 0 ? `В наличии: ${product.inStock} шт.` : "Нет в наличии"}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full bg-slate-800 hover:bg-slate-700"
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Добавить в корзину
              </Button>

              <div className="text-sm text-gray-500 space-y-1">
                <p>✓ Бесплатная доставка от 15 000 ₽</p>
                <p>✓ Ручная работа</p>
                <p>✓ Изготовление в течение 14 дней</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

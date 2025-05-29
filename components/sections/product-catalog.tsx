"use client"

import { useState } from "react"
import { mockProducts, productCategories } from "@/lib/data/products"
import type { ProductCategory } from "@/lib/types"
import ProductCard from "@/components/products/product-card"
import ProductModal from "@/components/products/product-modal"
import ProductSkeleton from "@/components/products/product-skeleton"
import { Button } from "@/components/ui/button"

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getProductsByCategory = (category: ProductCategory) => {
    return mockProducts.filter((product) => product.category === category)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-onest text-center mb-6 text-gray-800">Наш каталог</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {productCategories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-onest"
              onClick={() => scrollToSection(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {productCategories.map((category) => (
          <div key={category.id} id={category.id} className="mb-16">
            <h3 className="font-onest text-3xl mb-8 text-gray-800">{category.name}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)
                : getProductsByCategory(category.id).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={() => setSelectedProduct(product.id)}
                    />
                  ))}
            </div>
          </div>
        ))}

        {selectedProduct && <ProductModal productId={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </section>
  )
}

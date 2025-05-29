"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById("catalog")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 py-20 overflow-hidden">
      {/* Листики на фоне */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-emerald-600 animate-pulse">🍃</div>
        <div className="absolute top-20 right-20 text-4xl text-emerald-500 animate-bounce">🌿</div>
        <div className="absolute bottom-20 left-20 text-5xl text-emerald-600 animate-pulse">🍀</div>
        <div className="absolute bottom-10 right-10 text-3xl text-emerald-500 animate-bounce">🌱</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-emerald-600 animate-pulse">🍃</div>
        <div className="absolute top-1/3 right-1/3 text-5xl text-emerald-500 animate-bounce">🌿</div>
        <div className="absolute bottom-1/3 left-1/2 text-3xl text-emerald-600 animate-pulse">🍀</div>
        <div className="absolute top-3/4 right-1/4 text-4xl text-emerald-500 animate-bounce">🌱</div>
        <div className="absolute top-5 left-1/2 text-5xl text-emerald-400 animate-bounce">🌿</div>
        <div className="absolute bottom-5 right-1/2 text-4xl text-emerald-500 animate-pulse">🍀</div>
        <div className="absolute top-2/3 left-1/3 text-3xl text-emerald-400 animate-bounce">🌱</div>
        <div className="absolute bottom-2/3 right-10 text-6xl text-emerald-600 animate-pulse">🍃</div>
        <div className="absolute top-16 left-1/3 text-4xl text-emerald-500 animate-bounce">🍃</div>
        <div className="absolute bottom-16 right-1/3 text-5xl text-emerald-400 animate-pulse">🌿</div>
        <div className="absolute top-1/4 left-1/4 text-3xl text-emerald-500 animate-bounce">🍀</div>
        <div className="absolute bottom-1/4 left-5 text-4xl text-emerald-600 animate-pulse">🌱</div>
        <div className="absolute top-1/4 left-3/4 text-4xl text-emerald-500 animate-bounce">🍃</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-bumiku">Akteya</h1>
        <h2 className="text-2xl md:text-3xl text-emerald-900 mb-6 font-onest">Природные украшения</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-onest">
          Откройте для себя коллекцию украшений ручной работы из натуральных материалов, созданных в гармонии с природой
        </p>
        <Button size="lg" className="bg-emerald-900 hover:bg-emerald-700" onClick={scrollToCatalog}>
          Посмотреть каталог
        </Button>
      </div>
    </section>
  )
}

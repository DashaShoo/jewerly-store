export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-5xl font-semibold mb-4 font-bumiku">Akteya</h3>
            <p className="font-onest text-gray-300">Природные украшения ручной работы из натуральных материалов</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-onest">Контакты</h3>
            <div className="text-gray-300 space-y-2">
              <p>📞 +7 (495) 123-45-67</p>
              <p>📧 info@akteya.ru</p>
              <p>📍 Москва, ул. Природная, 123</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-onest">Информация</h3>
            <div className="text-gray-300 space-y-2">
              <p><a href="#0">О компании</a></p>
              <p><a href="#0">Доставка и оплата</a></p>
              <p><a href="#0">Гарантии</a></p>
              <p><a href="#0">Контакты</a></p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2025 DashaShu</p>
        </div>
      </div>
    </footer>
  )
}

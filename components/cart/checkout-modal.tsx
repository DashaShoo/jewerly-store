"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/lib/stores/cart-store";
import { CheckCircle } from "lucide-react";

interface CheckoutForm {
  name: string,
  email: string,
  phone: string,
  address: string,
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  notes?: string
}

interface CheckoutModalProps {
  isOpen: boolean,
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  };

  const onSubmit = async (data: CheckoutForm) => {
    setIsLoading(true);

    // симуляция работы с сервером
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Order submitted:", { items, total: getTotal(), customerData: data });

    setIsLoading(false);
    setIsSubmitted(true);
    clearCart();
  }

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Заказ оформлен!</h2>
            <p className="text-gray-600 mb-6">
              Спасибо за покупку! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
            </p>
            <Button onClick={handleClose} className="bg-slate-800 hover:bg-slate-700">
              Продолжить покупки
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Инфа о заказе */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Ваш заказ</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Итого:</span>
                <span className="text-slate-800">{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>

          {/* Инфа о доставке */}
          <div className="space-y-4">
            <h3 className="font-semibold">Информация для доставки</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Имя обязательно",
                    minLength: { value: 2, message: "Минимум 2 символа" },
                    maxLength: { value: 50, message: "Максимум 50 символов" },
                  })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email обязателен",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Введите корректный Email"
                    }
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Телефон обязателен",
                  pattern: {
                    value: /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                    message: "Введите корректный телефон"
                  }
                })}
                placeholder="+7 (999) 123-45-67"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="address">Адрес доставки *</Label>
              <Textarea
                id="address"
                {...register("address", {
                  required: "Адрес обязателен",
                  minLength: { value: 5, message: "Адрес слишком короткий" },
                  maxLength: { value: 200, message: "Адрес слишком длинный" },
                })}
                placeholder="Укажите полный адрес доставки"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </div>

          {/* Инфа об оплате */}
          <div className="space-y-4">
            <h3 className="font-semibold">Информация для оплаты</h3>

            <div>
              <Label htmlFor="cardNumber">Номер карты *</Label>
              <Input
                id="cardNumber"
                {...register("cardNumber", {
                  required: "Номер карты обязателен",
                  pattern: {
                    // 16 цифр подряд, можно с пробелами
                    value: /^(\d{4} ?){3}\d{4}$/,
                    message: "Введите корректный номер карты (16 цифр)"
                  }
                })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                inputMode="numeric"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Срок действия *</Label>
                <Input
                  id="expiryDate"
                  {...register("expiryDate", {
                    required: "Срок действия обязателен",
                    pattern: {
                      // Формат MM/YY, где MM 01-12, YY 00-99
                      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                      message: "Введите корректный срок действия (MM/YY)"
                    }
                  })}
                  placeholder="MM/YY"
                  maxLength={5}
                  inputMode="numeric"
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
              </div>

              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  {...register("cvv", {
                    required: "CVV обязателен",
                    pattern: {
                      value: /^\d{3}$/,
                      message: "Введите корректный CVV (3 цифры)"
                    }
                  })}
                  placeholder="123"
                  maxLength={4}
                  inputMode="numeric"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Комментарий к заказу</Label>
            <Textarea id="notes" {...register("notes")} placeholder="Дополнительные пожелания или комментарии" />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" className="flex-1 bg-slate-800 hover:bg-slate-700" disabled={isLoading}>
              {isLoading ? "Оформление..." : `Оплатить ${formatPrice(getTotal())}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

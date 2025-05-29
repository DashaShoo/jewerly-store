"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useModalStore } from "@/lib/stores/modal-store";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm extends LoginForm {
  name: string;
  confirmPassword: string;
}

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null); // <-- состояние для ошибки
  const { login, register, isLoading } = useAuthStore();
  const { isAuthModalOpen, closeAuthModal } = useModalStore();

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const onLoginSubmit = async (data: LoginForm) => {
    try {
      setLoginError(null); // сбрасываем ошибку перед новым запросом
      await login(data.email, data.password);
      closeAuthModal();
      loginForm.reset();
    } catch (error) {
      console.error("Login failed:", error);
      // Выводим ошибку в состояние. Можно кастомизировать сообщение, например, если error.message есть
      setLoginError("Неправильный логин или пароль / Ошибка входа");
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    try {
      await register(data.email, data.password, data.name);
      closeAuthModal();
      registerForm.reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Вход в аккаунт" : "Регистрация"}</DialogTitle>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...loginForm.register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Введите корректный Email",
                  },
                })}
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                {...loginForm.register("password", {
                  required: "Пароль обязателен",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            {/* Вывод ошибки входа */}
            {loginError && (
              <p className="text-red-600 text-center text-sm mt-2">{loginError}</p>
            )}

            <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>

            <p className="text-center text-sm">
              Нет аккаунта?{" "}
              <button type="button" className="text-slate-800 hover:underline" onClick={() => {
                setIsLogin(false);
                setLoginError(null); // Сброс ошибки при переключении на регистрацию
              }}>
                Зарегистрироваться
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                {...registerForm.register("name", {
                  required: "Имя обязательно",
                  minLength: { value: 2, message: "Минимум 2 символа" },
                  maxLength: { value: 50, message: "Максимум 50 символов" },
                })}
              />
              {registerForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="register-email">Email *</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="user@example.com"
                {...registerForm.register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Введите корректный Email",
                  },
                })}
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="register-password">Пароль *</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Введите пароль"
                {...registerForm.register("password", {
                  required: "Пароль обязателен",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                })}
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirm-password">Подтвердите пароль *</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Повторите пароль"
                {...registerForm.register("confirmPassword", {
                  required: "Подтверждение пароля обязательно",
                  validate: (value) =>
                    value === registerForm.getValues("password") || "Пароли не совпадают",
                })}
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>

            <p className="text-center text-sm">
              Уже есть аккаунт?{" "}
              <button type="button" className="text-slate-800 hover:underline" onClick={() => {
                setIsLogin(true);
                setLoginError(null); // Сброс ошибки при переключении на вход
              }}>
                Войти
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
  email: string,
  password: string
}

interface RegisterForm extends LoginForm {
  name: string,
  confirmPassword: string
}

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useAuthStore();
  const { isAuthModalOpen, closeAuthModal } = useModalStore();

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const onLoginSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      closeAuthModal();
      loginForm.reset();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError("confirmPassword", {
        message: "Пароли не совпадают",
      });
      return;
    }

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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...loginForm.register("email", { required: "Email обязателен" })}
                placeholder="user@example.com"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...loginForm.register("password", { required: "Пароль обязателен" })}
                placeholder="password"
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>

            <p className="text-center text-sm">
              Нет аккаунта?{" "}
              <button type="button" className="text-slate-800 hover:underline" onClick={() => setIsLogin(false)}>
                Зарегистрироваться
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" {...registerForm.register("name", { required: "Имя обязательно" })} />
              {registerForm.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                {...registerForm.register("email", { required: "Email обязателен" })}
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                type="password"
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
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                {...registerForm.register("confirmPassword", { required: "Подтверждение пароля обязательно" })}
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
              <button type="button" className="text-slate-800 hover:underline" onClick={() => setIsLogin(true)}>
                Войти
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

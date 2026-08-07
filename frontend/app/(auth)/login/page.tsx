"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth";
import { FormError, getDashboardRoute, useError, Button, Field } from "@/shared";
import { AppError } from "@/shared/errors/AppError";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();
  const { handleError } = useError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setFieldErrors({});
    try {
      setLoading(true);
      const user = await login(email, password);
      router.replace(getDashboardRoute(user.role));
    } catch (err) {
      if (err instanceof AppError) {
        switch (err.type) {
          case "AUTH":
          case "FORBIDDEN":
            setError(err.message);
            return;

          case "VALIDATION":
            setFieldErrors(
              (err.details ?? {}) as {
                email?: string;
                password?: string;
              },
            );
            return;
        }
      }

      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:max-w-lg sm:p-10 lg:max-w-xl">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage your university attendance system.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
          {error && <FormError message={error} />}
          <Field label="Email" required error={fieldErrors?.email}>
            <Field.Input
              type="email"
              placeholder="you@example.com"
              autoFocus
              autoComplete="email"
              leftIcon={<Mail size={18} />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({
                  ...prev,
                  email: undefined,
                }));
              }}
            />
          </Field>

          <Field label="Password" required error={fieldErrors?.password}>
            <Field.Input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({
                  ...prev,
                  password: undefined,
                }));
              }}
              leftIcon={<Lock size={18} />}
              showPasswordToggle
            />
          </Field>
          <Button type="submit" size="lg" loading={loading} fullWidth>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}

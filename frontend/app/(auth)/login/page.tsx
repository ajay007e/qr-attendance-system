"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth";
import { FormError, getDashboardRoute, useError, Button } from "@/shared";
import { AppError } from "@/shared/errors/AppError";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();
  const { handleError } = useError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
              err.details as {
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
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-50
        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-md

          rounded-2xl
          border
          border-slate-200
          bg-white

          p-6
          shadow-sm

          sm:max-w-lg
          sm:p-10

          lg:max-w-xl
        "
      >
        {/* Header */}

        <div className="mb-10">
          <h1
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            Welcome back
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Sign in to manage your university attendance system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
          {error && <FormError message={error} />}

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="email"
                type="email"
                required
                disabled={loading}
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setFieldErrors((prev) => ({
                    ...prev,
                    email: undefined,
                  }));
                }}
                className="
                  h-12
                  w-full

                  rounded-xl
                  border
                  border-slate-300

                  bg-white

                  pl-11
                  pr-4

                  text-sm
                  text-slate-900

                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-blue-600
                  focus:ring-4
                  focus:ring-blue-100

                  disabled:opacity-60
                "
              />
            </div>

            {fieldErrors.email && (
              <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setFieldErrors((prev) => ({
                    ...prev,
                    password: undefined,
                  }));
                }}
                className="
                  h-12
                  w-full

                  rounded-xl
                  border
                  border-slate-300

                  pl-11
                  pr-12

                  text-sm
                  text-slate-900

                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-blue-600
                  focus:ring-4
                  focus:ring-blue-100

                  disabled:opacity-60
                "
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={loading}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            {fieldErrors.password && (
              <p className="mt-2 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" loading={loading} fullWidth>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}

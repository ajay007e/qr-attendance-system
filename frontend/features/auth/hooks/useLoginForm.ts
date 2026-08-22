"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

import { useAuth } from "@/features/auth";
import { AppError, getDashboardRoute, useError } from "@/shared";

export function useLoginForm() {
  const router = useRouter();

  const { login } = useAuth();
  const { handleError } = useError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError("");
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setError("");
  }, []);

  const validate = useCallback(() => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!password) {
      setError("Password is required.");
      return false;
    }

    return true;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading || !validate()) {
        return;
      }

      setError("");
      setLoading(true);

      try {
        const user = await login({
          email,
          password,
        });

        router.replace(getDashboardRoute(user.role));
      } catch (err) {
        if (err instanceof AppError) {
          switch (err.type) {
            case "AUTH":
            case "FORBIDDEN":
            case "VALIDATION":
              setError(err.message);
              return;
          }
        }

        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, validate, login, router, handleError],
  );

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}

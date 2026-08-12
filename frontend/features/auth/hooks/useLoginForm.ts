"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { AppError, getDashboardRoute, useError } from "@/shared";
import { useAuth } from "./useAuth";

export function useLoginForm() {
  const router = useRouter();

  const { login } = useAuth();
  const { handleError } = useError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  function validate() {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const user = await login(email, password);
      router.replace(getDashboardRoute(user.role));
    } catch (err) {
      if (err instanceof AppError) {
        switch (err.type) {
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
  }

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

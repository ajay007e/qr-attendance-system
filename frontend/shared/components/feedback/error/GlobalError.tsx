"use client";

import { useEffect } from "react";

import { useError } from "@/shared";

import LoginRequiredModal from "./components/LoginRequiredModal";
import ErrorToast from "./components/ErrorToast";

export default function GlobalError() {
  const { error, clearError } = useError();

  useEffect(() => {
    if (!error) {
      return;
    }

    if (error.type === "AUTH") {
      return;
    }

    const timer = setTimeout(() => {
      clearError();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, clearError]);

  if (!error) {
    return null;
  }

  if (error.type === "AUTH") {
    return <LoginRequiredModal />;
  }

  return <ErrorToast message={error.message} onDismiss={clearError} />;
}

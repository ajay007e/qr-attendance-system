"use client";

import { FormEvent, useCallback, useState } from "react";

import { AppError, useError, useToast } from "@/shared";

import type { UseFormStateOptions } from "../types";

export function useFormState<TValues, TPayload = TValues>({
  initialValues,
  onSubmit,
  transform,
  validate,
  successMessage,
  errorMessage,
}: UseFormStateOptions<TValues, TPayload>) {
  const { success } = useToast();
  const { handleError } = useError();

  const [values, setValues] = useState<TValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setValue = useCallback(<K extends keyof TValues>(field: K, value: TValues[K]) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setError("");
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      setError("");

      const validationError = validate?.(values);

      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);

      try {
        const payload = transform ? transform(values) : (values as unknown as TPayload);

        await onSubmit(payload);

        if (successMessage) {
          success(successMessage);
        }
      } catch (err) {
        if (err instanceof AppError) {
          if (err.type === "AUTH") {
            handleError(err);
            return;
          }

          setError(err.message);
          return;
        }

        if (errorMessage) {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [errorMessage, handleError, loading, onSubmit, success, successMessage, transform, validate, values],
  );

  return {
    values,
    loading,
    error,

    setValue,
    setValues,

    reset,
    handleSubmit,
  };
}

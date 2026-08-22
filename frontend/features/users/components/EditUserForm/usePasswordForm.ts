"use client";

import { useFormState } from "@/shared";

import type { ChangePasswordPayload, PasswordFormProps, PasswordFormValues } from "./types";

export function usePasswordForm({ userId, onSubmit }: PasswordFormProps) {
  const form = useFormState<PasswordFormValues, ChangePasswordPayload>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: (values) => {
      if (!values.password) {
        return "Password is required.";
      }

      if (!values.confirmPassword) {
        return "Please confirm your password.";
      }

      if (values.password !== values.confirmPassword) {
        return "Passwords do not match.";
      }

      return null;
    },

    transform: (values) => ({
      id: userId,
      password: values.password,
    }),

    onSubmit,

    successMessage: "Password changed successfully.",
    errorMessage: "Unable to change password.",
  });

  return {
    ...form,

    canSubmit:
      Boolean(form.values.password) &&
      Boolean(form.values.confirmPassword) &&
      form.values.password === form.values.confirmPassword,
  };
}

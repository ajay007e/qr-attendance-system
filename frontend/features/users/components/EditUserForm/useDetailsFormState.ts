"use client";

import { useMemo } from "react";

import { UpdateUserRequest } from "@/features/users";
import { useFormState } from "@/shared";

import type { DetailsFormProps, UpdateUserPayload } from "./types";

export function useUserDetailsForm({ user, onSubmit }: DetailsFormProps) {
  const initialValues = useMemo<UpdateUserRequest>(
    () => ({
      firstName: user.firstName,
      lastName: user.lastName ?? "",
      email: user.email,
      role: user.role,
    }),
    [user],
  );

  return useFormState<UpdateUserRequest, UpdateUserPayload>({
    initialValues,

    transform: (values) => ({
      id: user.id,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      role: values.role,
    }),

    onSubmit,

    successMessage: "User details updated successfully.",
    errorMessage: "Unable to update user.",
  });
}

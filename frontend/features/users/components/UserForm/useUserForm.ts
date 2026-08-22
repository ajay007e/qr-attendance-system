"use client";

import { CreateUserRequest, DEFAULT_USER_CREATE_DATA } from "@/features/users";
import { useFormState } from "@/shared";

import { UserFormProps } from "./types";

export function useUserForm({ onSubmit }: UserFormProps) {
  return useFormState<CreateUserRequest, CreateUserRequest>({
    initialValues: DEFAULT_USER_CREATE_DATA,

    transform: (values) => ({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      role: values.role,
    }),

    onSubmit,

    successMessage: "User created successfully.",
    errorMessage: "Unable to create user.",
  });
}

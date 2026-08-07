"use client";

import { FormEvent, useState } from "react";

import { AppError } from "@/shared/errors/AppError";
import {
  Button,
  CustomDropdown,
  FormError,
  FormInput,
  UI_USER_ROLE_OPTIONS,
  USER_ROLES,
  UserRole,
} from "@/shared";
import { UserFormProps } from "../../types";

export default function UserForm({ onSubmit }: UserFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState<UserRole>(USER_ROLES.STUDENT);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError("");
    try {
      setLoading(true);
      await onSubmit({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to create user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
      {/* Error */}
      {error && <FormError message={error} />}

      {/* Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          label="First Name"
          required
          disabled={loading}
          placeholder="Enter first name"
          value={firstName}
          onChange={setFirstName}
        />

        <FormInput
          label="Last Name"
          disabled={loading}
          placeholder="Enter last name"
          value={lastName}
          onChange={setLastName}
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        required
        disabled={loading}
        autoComplete="email"
        placeholder="Enter email address"
        value={email}
        onChange={setEmail}
      />

      <FormInput
        label="Password"
        type="password"
        required
        disabled={loading}
        autoComplete="new-password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      />

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role
        </label>

        <CustomDropdown
          value={role}
          onChange={setRole}
          placeholder="Select user role"
          options={UI_USER_ROLE_OPTIONS}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={loading}
        disabled={!role}
        className="mt-2"
      >
        {loading ? "Creating User..." : "Create User"}
      </Button>
    </form>
  );
}

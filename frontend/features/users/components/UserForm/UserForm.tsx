"use client";

import { FormEvent, useState } from "react";

import { AppError } from "@/shared/errors/AppError";
import { Button, FormError, Field, UI_USER_ROLE_OPTIONS, USER_ROLES, UserRole } from "@/shared";
import { UserFormProps } from "./types";

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
        firstName: firstName,
        lastName: lastName,
        email,
        password,
        role,
      });
    } catch (err) {
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
        <Field label="First Name" required>
          <Field.Input
            disabled={loading}
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Field>

        <Field label="Last Name">
          <Field.Input
            disabled={loading}
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Email Address" required>
        <Field.Input
          type="email"
          disabled={loading}
          autoComplete="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field label="Password" required>
        <Field.Input
          type="password"
          disabled={loading}
          autoComplete="new-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
        />
      </Field>

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
        <Field.Select value={role} onChange={setRole} placeholder="Select user role" options={UI_USER_ROLE_OPTIONS} />
      </div>

      <Button type="submit" size="lg" fullWidth loading={loading} disabled={!role} className="mt-2">
        {loading ? "Creating User..." : "Create User"}
      </Button>
    </form>
  );
}

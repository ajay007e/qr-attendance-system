"use client";

import { FormEvent, useState } from "react";
import { AppError } from "@/shared/errors/AppError";
import { Button, FormError, Field, UI_USER_ROLE_OPTIONS } from "@/shared";
import { DetailsFormProps } from "../../types";

export function DetailsForm({ user, onSubmit }: DetailsFormProps) {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name ?? "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");

    try {
      setLoading(true);

      await onSubmit({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email,
        role,
      });
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading}>
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="First Name" required>
            <Field.Input
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Field>
          <Field label="Last Name">
            <Field.Input placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Field>
        </div>
        <Field label="Email" required>
          <Field.Input
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
          <Field.Select value={role} onChange={setRole} options={UI_USER_ROLE_OPTIONS} />
        </div>
        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </fieldset>
    </form>
  );
}

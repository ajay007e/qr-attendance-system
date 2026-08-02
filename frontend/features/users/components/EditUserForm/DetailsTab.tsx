"use client";

import { FormEvent, useState } from "react";
import CustomDropdown from "@/shared/components/ui/CustomDropDown";
import { User, UpdateUserPayload } from "./types";
import { UI_USER_ROLE_OPTIONS } from "@/features/auth/options";
import { AppError } from "@/shared/errors/AppError";
import { FormError, FormInput, SubmitButton } from "@/shared";

export function DetailsForm({
  user,
  onSubmit,
}: {
  user: User;
  onSubmit: (data: UpdateUserPayload) => Promise<void> | void;
}) {
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
        label="Email"
        type="email"
        required
        disabled={loading}
        autoComplete="email"
        placeholder="Enter email address"
        value={email}
        onChange={setEmail}
      />

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role
        </label>

        <CustomDropdown
          value={role}
          onChange={setRole}
          options={UI_USER_ROLE_OPTIONS}
          disabled={loading}
        />
      </div>

      {/* Submit */}
      <SubmitButton disabled={loading}>
        {loading ? "Saving Changes..." : "Save Changes"}
      </SubmitButton>
    </form>
  );
}

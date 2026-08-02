"use client";

import { FormEvent, useState } from "react";
import { ChangePasswordPayload } from "./types";
import { AppError } from "@/shared/errors/AppError";
import { FormError, FormInput, SubmitButton } from "@/shared";

export function PasswordForm({
  userId,
  onSubmit,
}: {
  userId: number;
  onSubmit: (data: ChangePasswordPayload) => Promise<void> | void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        id: userId,
        password,
      });

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to change password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading}>
      {/* Error */}
      {error && <FormError message={error} />}

      <FormInput
        label="New Password"
        type="password"
        required
        disabled={loading}
        autoComplete="new-password"
        placeholder="Enter new password"
        value={password}
        onChange={setPassword}
      />

      <FormInput
        label="Confirm Password"
        type="password"
        required
        disabled={loading}
        autoComplete="new-password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <SubmitButton
        disabled={loading || !password || password !== confirmPassword}
      >
        {loading ? "Changing Password..." : "Change Password"}
      </SubmitButton>
    </form>
  );
}

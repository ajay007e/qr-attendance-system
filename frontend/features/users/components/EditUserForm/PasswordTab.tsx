"use client";

import { FormEvent, useState } from "react";
import { AppError } from "@/shared/errors/AppError";
import { Button, FormError, Field } from "@/shared";
import { PasswordFormProps } from "../../types";

export function PasswordForm({ userId, onSubmit }: PasswordFormProps) {
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
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}
        <Field label="New Password" required>
          <Field.Input
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
          />
        </Field>
        <Field label="Confirm Password" required>
          <Field.Input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!password || password !== confirmPassword}
        >
          {loading ? "Changing Password..." : "Change Password"}
        </Button>
      </fieldset>
    </form>
  );
}

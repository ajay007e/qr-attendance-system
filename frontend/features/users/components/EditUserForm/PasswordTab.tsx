"use client";

import { Button, Field, FormError } from "@/shared";

import { PasswordFormProps } from "./types";
import { usePasswordForm } from "./usePasswordForm";

export function PasswordForm({ userId, onSubmit }: PasswordFormProps) {
  const { values, loading, error, setValue, handleSubmit, canSubmit } = usePasswordForm({
    userId,
    onSubmit,
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading} noValidate>
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}

        <Field label="New Password" required>
          <Field.Input
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            value={values.password}
            onChange={(e) => setValue("password", e.target.value)}
            showPasswordToggle
          />
        </Field>

        <Field label="Confirm Password" required>
          <Field.Input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={values.confirmPassword}
            onChange={(e) => setValue("confirmPassword", e.target.value)}
            showPasswordToggle
          />
        </Field>

        <Button type="submit" size="lg" fullWidth loading={loading} disabled={loading || !canSubmit}>
          {loading ? "Changing Password..." : "Change Password"}
        </Button>
      </fieldset>
    </form>
  );
}

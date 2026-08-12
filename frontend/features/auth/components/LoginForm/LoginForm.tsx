"use client";

import { Lock, Mail } from "lucide-react";

import { Button, Field, FormError } from "@/shared";
import { useLoginForm } from "../../hooks/useLoginForm";

export function LoginForm() {
  const { email, password, loading, error, handleEmailChange, handlePasswordChange, handleSubmit } = useLoginForm();
  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
      {error && <FormError message={error} />}
      <Field label="Email" required>
        <Field.Input
          type="email"
          placeholder="you@example.com"
          autoFocus
          autoComplete="email"
          leftIcon={<Mail size={18} />}
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
        />
      </Field>
      <Field label="Password" required>
        <Field.Input
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          disabled={loading}
          onChange={(event) => handlePasswordChange(event.target.value)}
          leftIcon={<Lock size={18} />}
          showPasswordToggle
        />
      </Field>
      <Button type="submit" size="lg" loading={loading} fullWidth>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

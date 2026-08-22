"use client";

import { Button, Field, FormError, UI_USER_ROLE_OPTIONS } from "@/shared";

import { UserFormProps } from "./types";
import { useUserForm } from "./useUserForm";

export default function UserForm({ onSubmit }: UserFormProps) {
  const { values, loading, error, setValue, handleSubmit } = useUserForm({ onSubmit });

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading} noValidate>
      {error && <FormError message={error} />}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" required>
          <Field.Input
            disabled={loading}
            placeholder="Enter first name"
            value={values.firstName}
            onChange={(e) => setValue("firstName", e.target.value)}
            autoComplete="given-name"
          />
        </Field>

        <Field label="Last Name">
          <Field.Input
            disabled={loading}
            placeholder="Enter last name"
            value={values.lastName}
            onChange={(e) => setValue("lastName", e.target.value)}
            autoComplete="family-name"
          />
        </Field>
      </div>

      <Field label="Email Address" required>
        <Field.Input
          type="email"
          disabled={loading}
          autoComplete="email"
          placeholder="Enter email address"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
        />
      </Field>

      <Field label="Password" required>
        <Field.Input
          type="password"
          disabled={loading}
          autoComplete="new-password"
          placeholder="Enter password"
          value={values.password}
          onChange={(e) => setValue("password", e.target.value)}
          showPasswordToggle
        />
      </Field>

      <Field label="Role" required>
        <Field.Select
          disabled={loading}
          value={values.role}
          onChange={(value) => setValue("role", value)}
          placeholder="Select user role"
          options={UI_USER_ROLE_OPTIONS}
        />
      </Field>

      <Button type="submit" size="lg" fullWidth loading={loading} disabled={loading || !values.role} className="mt-2">
        {loading ? "Creating User..." : "Create User"}
      </Button>
    </form>
  );
}

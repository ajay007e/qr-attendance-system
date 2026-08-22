"use client";

import { Button, Field, FormError, UI_USER_ROLE_OPTIONS } from "@/shared";

import { DetailsFormProps } from "./types";
import { useUserDetailsForm } from "./useDetailsFormState";

export function DetailsForm({ user, onSubmit }: DetailsFormProps) {
  const { values, loading, error, setValue, handleSubmit } = useUserDetailsForm({
    user,
    onSubmit,
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading} noValidate>
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="First Name" required>
            <Field.Input
              placeholder="Enter first name"
              value={values.firstName}
              onChange={(e) => setValue("firstName", e.target.value)}
              autoComplete="given-name"
            />
          </Field>

          <Field label="Last Name">
            <Field.Input
              placeholder="Enter last name"
              value={values.lastName}
              onChange={(e) => setValue("lastName", e.target.value)}
              autoComplete="family-name"
            />
          </Field>
        </div>

        <Field label="Email" required>
          <Field.Input
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={values.email}
            onChange={(e) => setValue("email", e.target.value)}
          />
        </Field>

        <Field label="Role" required>
          <Field.Select
            value={values.role}
            onChange={(value) => setValue("role", value)}
            options={UI_USER_ROLE_OPTIONS}
          />
        </Field>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </fieldset>
    </form>
  );
}

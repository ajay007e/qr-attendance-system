"use client";

import { FormEvent, useState } from "react";

import { CreateUserRequest } from "@/features/users";
import CustomDropdown from "@/shared/components/ui/CustomDropDown";
import { USER_ROLES, UserRole } from "@/features/auth";

interface UserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void> | void;
}

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

      setError("Unable to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
      {/* Error */}
      {error && (
        <div
          role="alert"
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="First Name"
          required
          disabled={loading}
          placeholder="Enter first name"
          value={firstName}
          onChange={setFirstName}
        />

        <Input
          label="Last Name"
          disabled={loading}
          placeholder="Enter last name"
          value={lastName}
          onChange={setLastName}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        required
        disabled={loading}
        autoComplete="email"
        placeholder="Enter email address"
        value={email}
        onChange={setEmail}
      />

      <Input
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
          options={[
            {
              label: "Administrator",
              value: "ADMIN",
            },
            {
              label: "Lecturer",
              value: "LECTURER",
            },
            {
              label: "Student",
              value: "STUDENT",
            },
          ]}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !role}
        className="
          mt-2
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-xl
          bg-blue-600
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700

          focus:outline-none
          focus:ring-4
          focus:ring-blue-200

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? "Creating User..." : "Create User"}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition

          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}

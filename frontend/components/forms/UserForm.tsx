"use client";

import { FormEvent, useState } from "react";

import CustomDropdown from "@/components/common/CustomDropDown";
import { CreateUserRequest } from "@/features/users";
import { UserRole } from "@/types/auth";

interface UserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void> | void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState<UserRole>();

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
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
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

      <div
        className="
          grid
          grid-cols-1
          gap-5

          sm:grid-cols-2
        "
      >
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            First Name
          </label>

          <input
            required
            disabled={loading}
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              placeholder:text-gray-400
              shadow-sm
              transition-all
              duration-200
              outline-none

              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Last Name
          </label>

          <input
            disabled={loading}
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              placeholder:text-gray-400
              shadow-sm
              transition-all
              duration-200
              outline-none

              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>
      </div>

      {/* Email */}

      <div>
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
          Email Address
        </label>

        <input
          type="email"
          required
          disabled={loading}
          autoComplete="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-gray-900
            placeholder:text-gray-400
            shadow-sm
            transition-all
            duration-200
            outline-none

            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Password */}

      <div>
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
          Password
        </label>

        <input
          type="password"
          required
          disabled={loading}
          autoComplete="new-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-gray-900
            placeholder:text-gray-400
            shadow-sm
            transition-all
            duration-200
            outline-none

            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />
      </div>

      {/* Role */}

      <div>
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-gray-700
          "
        >
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

      <button
        type="submit"
        disabled={loading || !role}
        aria-disabled={loading}
        className="
          mt-2
          w-full
          rounded-xl
          bg-blue-600
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition-colors
          duration-200

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

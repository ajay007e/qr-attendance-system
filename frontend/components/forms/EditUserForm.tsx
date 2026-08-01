"use client";

import { useState } from "react";

import CustomDropdown from "@/components/common/CustomDropDown";

interface EditUserFormProps {
  user: {
    id: number;
    first_name: string;
    last_name: string | null;
    email: string;
    role: string;
  };

  onUpdate: (data: any) => void;
  onPasswordChange: (data: any) => void;
  onStatusChange: (data: boolean) => void;
}

type Tab = "details" | "password" | "delete";

export default function EditUserForm({
  user,
  onUpdate,
  onPasswordChange,
  onStatusChange,
}: EditUserFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name ?? "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex rounded-xl bg-gray-100 p-1">
        {[
          {
            key: "details",
            label: "Details",
          },
          {
            key: "password",
            label: "Password",
          },
          {
            key: "delete",
            label: "Delete",
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={`
              flex-1
              rounded-lg
              px-2
              py-2.5
              text-xs
              font-medium
              transition
              sm:text-sm

              ${
                activeTab === tab.key
                  ? tab.key === "delete"
                    ? "bg-white text-red-600 shadow-sm"
                    : "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Details */}
      {activeTab === "details" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onUpdate({
              id: user.id,
              first_name: firstName,
              last_name: lastName,
              email,
              role,
            });
          }}
          className="space-y-4"
        >
          <Input label="First Name" value={firstName} onChange={setFirstName} />

          <Input label="Last Name" value={lastName} onChange={setLastName} />

          <Input label="Email" type="email" value={email} onChange={setEmail} />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>

            <CustomDropdown
              value={role}
              onChange={setRole}
              options={[
                {
                  label: "Admin",
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

          <SubmitButton>Save Changes</SubmitButton>
        </form>
      )}

      {/* Password */}
      {activeTab === "password" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onPasswordChange({
              id: user.id,
              password,
            });
          }}
          className="space-y-4"
        >
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <SubmitButton disabled={password !== confirmPassword}>
            Change Password
          </SubmitButton>
        </form>
      )}

      {/* Delete */}
      {activeTab === "delete" && (
        <div className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-700">Delete User</h3>

          <p className="text-sm leading-relaxed text-red-600">
            This action cannot be undone. All user related data may be removed.
          </p>

          <button
            onClick={() => onStatusChange(false)}
            className="
              w-full
              rounded-xl
              bg-red-600
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}

function SubmitButton({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className="
        w-full
        rounded-xl
        bg-blue-600
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
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
          outline-none
          transition

          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}

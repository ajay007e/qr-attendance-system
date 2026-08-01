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
    <div className="space-y-6">
      {/* Tabs */}

      <div
        className="
flex
rounded-xl
bg-gray-100
p-1
"
      >
        <button
          onClick={() => setActiveTab("details")}
          className={`
flex-1
rounded-lg
px-3
py-2
text-sm
font-medium
transition

${
  activeTab === "details" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
}
`}
        >
          Update Details
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`
flex-1
rounded-lg
px-3
py-2
text-sm
font-medium
transition

${
  activeTab === "password"
    ? "bg-white text-blue-600 shadow-sm"
    : "text-gray-500"
}
`}
        >
          Change Password
        </button>

        <button
          onClick={() => setActiveTab("delete")}
          className={`
flex-1
rounded-lg
px-3
py-2
text-sm
font-medium
transition

${activeTab === "delete" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}
`}
        >
          Delete
        </button>
      </div>

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
          className="space-y-5"
        >
          <Input label="First Name" value={firstName} onChange={setFirstName} />

          <Input label="Last Name" value={lastName} onChange={setLastName} />

          <Input label="Email" type="email" value={email} onChange={setEmail} />

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

          <button
            className="
w-full
rounded-xl
bg-blue-600
py-3
text-sm
font-semibold
text-white
hover:bg-blue-700
"
          >
            Save Changes
          </button>
        </form>
      )}

      {activeTab === "password" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onPasswordChange({
              id: user.id,
              password,
            });
          }}
          className="space-y-5"
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

          <button
            disabled={password !== confirmPassword}
            className="
w-full
rounded-xl
bg-blue-600
py-3
text-sm
font-semibold
text-white

disabled:opacity-50
"
          >
            Change Password
          </button>
        </form>
      )}

      {activeTab === "delete" && (
        <div
          className="
space-y-5
rounded-xl
border
border-red-200
bg-red-50
p-5
"
        >
          <h3
            className="
font-semibold
text-red-700
"
          >
            Delete User
          </h3>

          <p
            className="
text-sm
text-red-600
"
          >
            This action cannot be undone. All user related data may be removed.
          </p>

          <button
            onClick={() => {
              onStatusChange(false);
            }}
            className="
w-full
rounded-xl
bg-red-600
py-3
text-sm
font-semibold
text-white
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
      <label
        className="
mb-2
block
text-sm
font-medium
text-gray-700
"
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
py-3
text-gray-900
shadow-sm
outline-none

focus:border-blue-600
focus:ring-4
focus:ring-blue-100
"
      />
    </div>
  );
}

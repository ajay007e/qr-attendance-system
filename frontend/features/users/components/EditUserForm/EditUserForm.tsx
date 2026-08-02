"use client";

import { useState } from "react";
import { Tabs } from "./Tabs";
import { DetailsForm } from "./DetailsTab";
import { PasswordForm } from "./PasswordTab";
import { DeleteUserTab } from "./DeleteTab";
import { Tab, EditUserFormProps } from "./types";

export default function EditUserForm({
  user,
  onUpdate,
  onPasswordChange,
  onStatusChange,
}: EditUserFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  return (
    <div className="space-y-5">
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "details" && (
        <DetailsForm user={user} onSubmit={onUpdate} />
      )}

      {activeTab === "password" && (
        <PasswordForm userId={user.id} onSubmit={onPasswordChange} />
      )}

      {activeTab === "delete" && (
        <DeleteUserTab onDelete={() => onStatusChange(false)} />
      )}
    </div>
  );
}

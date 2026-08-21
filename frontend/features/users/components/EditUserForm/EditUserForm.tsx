"use client";

import { useState } from "react";

import { Tabs } from "@/shared";

import { USER_TABS } from "../../constants";

import { DeleteUserTab } from "./DeleteTab";
import { DetailsForm } from "./DetailsTab";
import { PasswordForm } from "./PasswordTab";
import { EditUserFormProps, Tab } from "./types";

export default function EditUserForm({ user, onUpdate, onPasswordChange, onStatusChange }: EditUserFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  return (
    <div className="space-y-5">
      <Tabs
        tabs={USER_TABS}
        value={activeTab}
        onChange={(value) => setActiveTab(value as Tab)}
        variant="segmented"
        size="md"
        width="full"
        scrollable
        ariaLabel="User edit sections"
      />

      {activeTab === "details" && <DetailsForm user={user} onSubmit={onUpdate} />}

      {activeTab === "password" && <PasswordForm userId={user.id} onSubmit={onPasswordChange} />}

      {activeTab === "delete" && <DeleteUserTab isActive={user.isActive} onDelete={(flag) => onStatusChange(flag)} />}
    </div>
  );
}

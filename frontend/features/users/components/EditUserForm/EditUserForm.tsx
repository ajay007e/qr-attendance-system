"use client";

import { useState } from "react";

import { Tabs } from "@/shared";

import { DetailsForm } from "./DetailsTab";
import { PasswordForm } from "./PasswordTab";
import { DeleteUserTab } from "./DeleteTab";

import { TABS } from "../../constants";
import type { EditUserFormProps, Tab } from "../../types";

export default function EditUserForm({ user, onUpdate, onPasswordChange, onStatusChange }: EditUserFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  return (
    <div className="space-y-5">
      <Tabs
        tabs={TABS}
        value={activeTab}
        onChange={setActiveTab}
        variant="segmented"
        size="md"
        width="full"
        scrollable
        ariaLabel="User edit sections"
      />

      {activeTab === "details" && <DetailsForm user={user} onSubmit={onUpdate} />}

      {activeTab === "password" && <PasswordForm userId={user.id} onSubmit={onPasswordChange} />}

      {activeTab === "delete" && <DeleteUserTab onDelete={() => onStatusChange(false)} />}
    </div>
  );
}

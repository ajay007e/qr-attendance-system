"use client";

import { useState } from "react";

import { Tabs } from "@/shared";

import { OFFERING_TABS } from "../../constants";

import { DetailsTab } from "./DetailsTab";
import { LecturersTab } from "./LecturerTab";
import { StatusTab } from "./StatusTab";
import type { EditOfferingFormProps, OfferingEditTab } from "./types";

export default function EditOfferingForm({ offering, refresh, onClose, lecturerSearch }: EditOfferingFormProps) {
  const [activeTab, setActiveTab] = useState<OfferingEditTab>("details");

  return (
    <div className="space-y-5">
      <Tabs
        tabs={OFFERING_TABS}
        value={activeTab}
        onChange={setActiveTab}
        variant="segmented"
        size="md"
        width="full"
        scrollable
        ariaLabel="Course offering edit sections"
      />

      {activeTab === "details" && <DetailsTab offering={offering} refresh={refresh} onClose={onClose} />}

      {activeTab === "lecturers" && <LecturersTab offeringId={offering.id} lecturerSearch={lecturerSearch} />}

      {activeTab === "status" && <StatusTab offering={offering} refresh={refresh} onClose={onClose} />}
    </div>
  );
}

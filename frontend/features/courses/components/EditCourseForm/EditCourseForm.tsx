"use client";

import { useState } from "react";
import { CourseEditTab, EditCourseFormProps } from "./types";
import { Tabs } from "./Tab";
import { DetailsTab } from "./DetailsTab";
import { LecturersTab } from "./LecturerTab";
import { StatusTab } from "./StatusTab";

export default function EditCourseForm({
  course,
  onUpdate,
  onStatusChange,
}: EditCourseFormProps) {
  const [activeTab, setActiveTab] = useState<CourseEditTab>("details");

  return (
    <div className="space-y-5">
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "details" && (
        <DetailsTab course={course} onSubmit={onUpdate} />
      )}
      {activeTab === "lecturers" && <LecturersTab course={course} />}
      {activeTab === "status" && (
        <StatusTab course={course} onStatusChange={onStatusChange} />
      )}
    </div>
  );
}

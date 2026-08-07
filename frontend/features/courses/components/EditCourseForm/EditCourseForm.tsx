"use client";

import { useState } from "react";

import { Tabs } from "./Tab";
import { DetailsTab } from "./DetailsTab";
import { LecturersTab } from "./LecturerTab";
import { StatusTab } from "./StatusTab";

import { useCourseMutation } from "../../hooks/useCourseMutation";
import { CourseEditTab, EditCourseFormProps } from "../../types";

export default function EditCourseForm({
  course,
  refresh,
  onClose,
}: EditCourseFormProps) {
  const [activeTab, setActiveTab] = useState<CourseEditTab>("details");

  const { updateCourse } = useCourseMutation(refresh);

  async function handleUpdate(data: any) {
    await updateCourse(course.id, data);

    onClose();
  }

  return (
    <div className="space-y-5">
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "details" && (
        <DetailsTab course={course} refresh={refresh} onSubmit={handleUpdate} />
      )}

      {activeTab === "lecturers" && <LecturersTab course={course} />}

      {activeTab === "status" && (
        <StatusTab course={course} refresh={refresh} onClose={onClose} />
      )}
    </div>
  );
}

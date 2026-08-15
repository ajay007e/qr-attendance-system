"use client";

import { useState } from "react";

import { Tabs } from "@/shared";

import { DetailsTab } from "./DetailsTab";
import { LecturersTab } from "./LecturerTab";
import { StatusTab } from "./StatusTab";

import { useCourseMutation } from "../../hooks/useCourseMutation";
import { COURSE_TABS } from "../../constants";
import type { UpdateCourseRequest } from "../../types";
import type { CourseEditTab, EditCourseFormProps } from "./types";

export default function EditCourseForm({ course, refresh, onClose }: EditCourseFormProps) {
  const [activeTab, setActiveTab] = useState<CourseEditTab>("details");

  const { updateCourse } = useCourseMutation(refresh);

  async function handleUpdate(data: UpdateCourseRequest) {
    await updateCourse(course.id, data);
    onClose();
  }

  return (
    <div className="space-y-5">
      <Tabs
        tabs={COURSE_TABS}
        value={activeTab}
        onChange={setActiveTab}
        variant="segmented"
        size="md"
        width="full"
        scrollable
        ariaLabel="Course edit sections"
      />

      {activeTab === "details" && <DetailsTab course={course} refresh={refresh} onSubmit={handleUpdate} />}

      {activeTab === "lecturers" && <LecturersTab courseId={course.id} />}

      {activeTab === "status" && <StatusTab course={course} refresh={refresh} onClose={onClose} />}
    </div>
  );
}

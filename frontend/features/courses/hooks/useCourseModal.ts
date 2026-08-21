import { useState } from "react";

import type { Course } from "@/shared";

export function useCourseModal() {
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return {
    showCreateCourse,
    selectedCourse,

    openCreateCourse() {
      setShowCreateCourse(true);
    },

    closeCreateCourse() {
      setShowCreateCourse(false);
    },

    openEditCourse(course: Course) {
      setSelectedCourse(course);
    },

    closeEditCourse() {
      setSelectedCourse(null);
    },
  };
}

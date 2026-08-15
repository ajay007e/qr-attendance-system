"use client";

import { useState } from "react";

import { CourseManagement } from "@/features/courses";
import { useLecturerSearch } from "@/features/users";
import type { Lecturer } from "@/shared";

export default function CoursesPageClient() {
  const { query, setQuery, results, loading } = useLecturerSearch();

  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
  const [open, setOpen] = useState(false);

  const lecturerSearch = {
    query,
    results,
    loading,
    selectedLecturer,

    onQueryChange(value: string) {
      setQuery(value);
      setOpen(value.trim().length >= 2);
    },

    onSelect(lecturer: Lecturer | null) {
      setSelectedLecturer(lecturer);
      setOpen(false);
    },

    onClear() {
      setQuery("");
      setSelectedLecturer(null);
      setOpen(false);
    },

    onFocus() {
      if (query.trim().length >= 2) {
        setOpen(true);
      }
    },

    open,
  };

  return <CourseManagement lecturerSearch={lecturerSearch} />;
}

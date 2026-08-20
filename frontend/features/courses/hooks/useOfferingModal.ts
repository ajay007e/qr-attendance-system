"use client";

import { CourseOffering } from "@/shared";
import { useState } from "react";

export function useOfferingModal() {
  const [showCreateOffering, setShowCreateOffering] = useState(false);

  const [selectedOffering, setSelectedOffering] = useState<CourseOffering | null>(null);

  return {
    showCreateOffering,
    selectedOffering,

    openCreateOffering() {
      setShowCreateOffering(true);
    },

    closeCreateOffering() {
      setShowCreateOffering(false);
    },

    openEditOffering(offering: CourseOffering) {
      setSelectedOffering(offering);
    },

    closeEditOffering() {
      setSelectedOffering(null);
    },
  };
}

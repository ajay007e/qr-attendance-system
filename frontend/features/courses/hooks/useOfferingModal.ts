"use client";

import { useState } from "react";
import { CourseOffering } from "../types";

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

"use client";

import { OfferingManagement } from "@/features/courses";
import { useLecturerSearch } from "@/features/users";

export default function OfferingsPage() {
  const lecturerSearch = useLecturerSearch();

  return (
    <OfferingManagement
      lecturerSearch={{
        query: lecturerSearch.query,
        results: lecturerSearch.results,
        loading: lecturerSearch.loading,
        onQueryChange: lecturerSearch.setQuery,
      }}
    />
  );
}

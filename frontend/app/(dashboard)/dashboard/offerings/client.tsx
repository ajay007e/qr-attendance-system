"use client";

import { OfferingManagement } from "@/features/courses";
import { useLecturerSearch } from "@/features/users";

export function OfferingManagementClient() {
  const { query, results, loading, setQuery } = useLecturerSearch();

  return (
    <OfferingManagement
      lecturerSearch={{
        query: query,
        results: results,
        loading: loading,
        onQueryChange: setQuery,
      }}
    />
  );
}

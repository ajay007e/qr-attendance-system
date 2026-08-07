import { useState } from "react";

import type { CourseQuery } from "../types";
import { DEFAULT_COURSE_QUERY } from "../constants";

export function useCourseQuery() {
  const [query, setQuery] = useState<CourseQuery>(DEFAULT_COURSE_QUERY);

  function updateQuery(filters: CourseQuery) {
    setQuery({
      ...filters,
      page: 1,
    });
  }

  function resetQuery() {
    setQuery(DEFAULT_COURSE_QUERY);
  }

  return {
    query,
    setQuery: updateQuery,
    resetQuery,
  };
}

import type { Course } from "@/shared";

import type { CreateCourseOfferingRequest } from "../../types";

export interface OfferingCourseSearch {
  query: string;
  results: Course[];
  loading: boolean;
  selectedCourse: Course | null;
  setQuery: (value: string) => void;
  setSelectedCourse: (course: Course | null) => void;
}

export interface OfferingFormProps {
  courseSearch: OfferingCourseSearch;
  onSubmit: (data: CreateCourseOfferingRequest) => Promise<void>;
}

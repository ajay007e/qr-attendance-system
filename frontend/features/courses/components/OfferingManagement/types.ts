import type { Lecturer } from "@/shared";

export interface LecturerSearchProps {
  query: string;
  results: Lecturer[];
  loading: boolean;
  onQueryChange: (value: string) => void;
}

export interface OfferingManagementProps {
  lecturerSearch: LecturerSearchProps;
}

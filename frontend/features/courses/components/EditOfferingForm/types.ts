import type { Lecturer } from "@/shared";
import type { CourseOfferingListItem } from "../../types";

export type OfferingEditTab = "details" | "lecturers" | "status";

export interface DetailsTabProps {
  offering: CourseOfferingListItem;
  refresh: () => Promise<void>;
  onClose: () => void;
}

export interface LecturerSearchProps {
  query: string;
  results: Lecturer[];
  loading: boolean;
  selectedLecturer: Lecturer | null;
  onQueryChange: (value: string) => void;
  onSelect: (lecturer: Lecturer | null) => void;
  onClear?: () => void;
}

export interface LecturersTabProps {
  offeringId: number;
  lecturerSearch: LecturerSearchProps;
}

export interface StatusTabProps {
  offering: CourseOfferingListItem;
  refresh: () => Promise<void>;
  onClose: () => void;
}

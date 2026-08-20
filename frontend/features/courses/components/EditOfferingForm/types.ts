import type { CourseOffering, Lecturer } from "@/shared";

export type OfferingEditTab = "details" | "lecturers" | "status";

export interface EditOfferingFormProps {
  offering: CourseOffering;
  refresh: () => Promise<void>;
  onClose: () => void;

  lecturerSearch: {
    query: string;
    results: Lecturer[];
    loading: boolean;
    selectedLecturer: Lecturer | null;
    onQueryChange: (value: string) => void;
    onSelect: (lecturer: Lecturer | null) => void;
  };
}

export interface DetailsTabProps {
  offering: CourseOffering;
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
  offering: CourseOffering;
  refresh: () => Promise<void>;
  onClose: () => void;
}

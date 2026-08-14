import { Course } from "@/features/courses/types";

export interface Participant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ParticipantToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export interface ParticipantTableRowProps {
  participant: Participant;
}

export interface ParticipantCardProps {
  participant: Participant;
}

export interface ParticipantTableProps {
  participants: Participant[];
}

export interface ParticipantsTabProps {
  course: Course;
}

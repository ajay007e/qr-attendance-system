import { Course, User } from "@/shared";

export type Participant = Pick<User, "id" | "firstName" | "lastName" | "email">;

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

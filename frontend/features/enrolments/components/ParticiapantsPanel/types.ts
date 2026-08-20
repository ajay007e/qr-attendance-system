import type { Course, Participant } from "@/shared";

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
  offeringId: number;
}

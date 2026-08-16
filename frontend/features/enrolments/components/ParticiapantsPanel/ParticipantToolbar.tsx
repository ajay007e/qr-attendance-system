import { Field, SectionHeader } from "@/shared";
import { Search } from "lucide-react";

import type { ParticipantToolbarProps } from "./types";

export default function ParticipantToolbar({ search, onSearchChange }: ParticipantToolbarProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeader title="Participants" subtitle="Students enrolled in this course" />
        <div className="w-full lg:w-72">
          <Field.Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search participants..."
            leftIcon={<Search size={18} />}
            clearable
            onClear={() => onSearchChange("")}
          />
        </div>
      </div>
    </div>
  );
}

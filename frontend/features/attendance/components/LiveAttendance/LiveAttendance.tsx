import { ComingSoon, Section, SectionHeader } from "@/shared";

interface LiveAttendanceProps {
  sessionControls?: React.ReactNode;
}

export default function LiveAttendance({ sessionControls }: LiveAttendanceProps) {
  return (
    <Section>
      <SectionHeader
        title="Live Attendance"
        subtitle="View and manage attendance for students in the current session."
        action={sessionControls}
      />

      <div className="mt-5">
        <ComingSoon
          title="Live Attendance Coming Soon"
          message="Live attendance records, manual attendance marking and real-time participation updates will be available here."
          size="md"
        />
      </div>
    </Section>
  );
}

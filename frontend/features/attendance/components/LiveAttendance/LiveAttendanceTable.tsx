import { ComingSoon, SectionHeader, Section } from "@/shared";

export default function LiveAttendance() {
  return (
    <Section>
      <SectionHeader
        title="Live Attendance"
        subtitle="View and manage attendance for students in the current session."
      />
      <ComingSoon
        title="Live Attendance Coming Soon"
        message="Live attendance records, manual attendance marking and real-time participation updates will be available here."
        size="md"
      />
    </Section>
  );
}

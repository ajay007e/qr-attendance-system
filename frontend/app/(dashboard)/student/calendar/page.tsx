import { SectionHeader, ComingSoon, Container } from "@/shared";

export default function StudentCalendarPage() {
  return (
    <Container>
      <SectionHeader title="Calendar" subtitle="Your class and attendance schedule, all in one place." />
      <ComingSoon
        title="Calendar Coming Soon"
        message="A calendar view of your classes and attendance sessions is on the way."
      />
    </Container>
  );
}

import { LecturerDashboard } from "@/features/courses/components/LecturerDashboard";
import { ComingSoon, Container, Section } from "@/shared";

export default function LecturerDashboardPage() {
  return (
    <Container>
      <LecturerDashboard />
      <Section className="grid gap-4 lg:grid-cols-2">
        <ComingSoon
          title="Timeline Coming Soon"
          message="Your upcoming classes and attendance sessions will appear here."
          size="sm"
        />
        <ComingSoon title="Calendar Coming Soon" message="A calendar view of your schedule is on the way." size="sm" />
      </Section>
    </Container>
  );
}

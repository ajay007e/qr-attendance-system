import { SectionHeader, ComingSoon, Section } from "@/shared";

export default function StudentCalendarPage() {
  return (
    <>
      <SectionHeader title="Calendar" subtitle="Your class and attendance schedule, all in one place." />
      <Section>
        <ComingSoon
          title="Calendar Coming Soon"
          message="A calendar view of your classes and attendance sessions is on the way."
        />
      </Section>
    </>
  );
}

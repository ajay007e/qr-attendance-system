import { StudentDashboard } from "@/features/enrolments";
import { ComingSoon } from "@/shared";

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <StudentDashboard />

      <section className="grid gap-4 lg:grid-cols-2">
        <ComingSoon
          title="Timeline Coming Soon"
          message="Your upcoming classes and attendance sessions will appear here."
          size="sm"
        />

        <ComingSoon
          title="Calendar Coming Soon"
          message="A calendar view of your schedule is on the way."
          size="sm"
        />
      </section>
    </div>
  );
}

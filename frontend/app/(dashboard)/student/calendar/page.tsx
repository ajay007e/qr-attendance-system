import { AdminPageHeader, ComingSoon } from "@/shared";

export default function StudentCalendarPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <AdminPageHeader
        title="Calendar"
        subtitle="Your class and attendance schedule, all in one place."
      />

      <ComingSoon
        title="Calendar Coming Soon"
        message="A calendar view of your classes and attendance sessions is on the way."
      />
    </div>
  );
}

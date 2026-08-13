import { BookOpenCheck } from "lucide-react";

import { ComingSoon, PageHeader } from "@/shared";

export default function LecturerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <PageHeader
        title="Lecturer Dashboard"
        subtitle="Manage your assigned courses, attendance sessions, and student records."
      />

      <section>
        <ComingSoon
          icon={<BookOpenCheck />}
          title="Lecturer Dashboard Coming Soon"
          message="Soon you will be able to manage your assigned courses, start attendance sessions, review attendance history, and monitor student participation from one place."
          status="Under Development"
          size="md"
        />
      </section>
    </div>
  );
}

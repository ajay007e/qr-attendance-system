import { BookOpenCheck } from "lucide-react";

import PageHeader from "@/components/layout/AdminPageHeader";

export default function LecturerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <PageHeader
        title="Lecturer Dashboard"
        subtitle="Manage your assigned courses, attendance sessions, and student records."
      />

      <section>
        <LecturerDashboardComingSoon />
      </section>
    </div>
  );
}

function LecturerDashboardComingSoon() {
  return (
    <div
      className="
        flex
        min-h-[320px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-gray-300
        bg-white
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-blue-600
        "
      >
        <BookOpenCheck size={28} />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-semibold
          text-gray-900
        "
      >
        Lecturer Dashboard Coming Soon
      </h2>

      <p
        className="
          mt-2
          max-w-lg
          text-sm
          leading-6
          text-gray-500
        "
      >
        Soon you'll be able to manage your assigned courses, start attendance
        sessions, review attendance history, and monitor student participation
        from one place.
      </p>

      <span
        className="
          mt-5
          rounded-full
          bg-blue-50
          px-4
          py-1.5
          text-xs
          font-medium
          text-blue-600
        "
      >
        Under Development
      </span>
    </div>
  );
}

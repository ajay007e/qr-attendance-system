import { GraduationCap } from "lucide-react";

import PageHeader from "@/components/layout/AdminPageHeader";

export default function StudentDashboardPage() {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
        space-y-5
        sm:space-y-6
      "
    >
      <PageHeader
        title="Student Dashboard"
        subtitle="View your courses, attendance records, and academic progress."
      />

      <section>
        <StudentDashboardComingSoon />
      </section>
    </div>
  );
}

function StudentDashboardComingSoon() {
  return (
    <div
      className="
        flex
        min-h-[240px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-gray-300
        bg-white
        px-5
        py-8
        text-center
        sm:min-h-[320px]
        sm:px-6
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-blue-600
          sm:h-14
          sm:w-14
        "
      >
        <GraduationCap size={24} className="sm:h-7 sm:w-7" />
      </div>

      <h2
        className="
          mt-4
          text-lg
          font-semibold
          text-gray-900
          sm:mt-5
          sm:text-xl
        "
      >
        Student Dashboard Coming Soon
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
        Soon you'll be able to view your enrolled courses, track your
        attendance, check attendance history, and stay up to date with your
        academic progress from a single dashboard.
      </p>

      <span
        className="
          mt-4
          rounded-full
          bg-blue-50
          px-4
          py-1.5
          text-xs
          font-medium
          text-blue-600
          sm:mt-5
        "
      >
        Under Development
      </span>
    </div>
  );
}

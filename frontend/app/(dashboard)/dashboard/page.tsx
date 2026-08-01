import PageHeader from "@/components/layout/AdminPageHeader";

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage users, attendance records, courses, and system settings."
      />

      {/* Page Content */}
      <section>
        <AnalyticsComingSoon />
      </section>
    </div>
  );
}
import { BarChart3 } from "lucide-react";

function AnalyticsComingSoon() {
  return (
    <div
      className="
          flex
          min-h-[280px]
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
        <BarChart3 size={28} />
      </div>

      <h2
        className="
            mt-5
            text-xl
            font-semibold
            text-gray-900
          "
      >
        Analytics Coming Soon
      </h2>

      <p
        className="
            mt-2
            max-w-md
            text-sm
            text-gray-500
          "
      >
        Attendance trends, performance insights, and detailed reports will be
        available here soon.
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

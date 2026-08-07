import { AdminPageHeader, ComingSoon } from "@/shared";

export default function AdminPage() {
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
      <AdminPageHeader
        title="Admin Dashboard"
        subtitle="Manage users, attendance records, courses, and system settings."
      />

      <section>
        <ComingSoon
          title="Analytics Coming Soon"
          message="Attendance trends, performance insights, and detailed reports will be available here soon."
        />
      </section>
    </div>
  );
}

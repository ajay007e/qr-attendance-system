import { ComingSoon, Section, PageHeader } from "@/shared";

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Manage users, attendance records, courses, and system settings." />
      <Section>
        <ComingSoon
          title="Analytics Coming Soon"
          message="Attendance trends, performance insights, and detailed reports will be available here soon."
        />
      </Section>
    </>
  );
}

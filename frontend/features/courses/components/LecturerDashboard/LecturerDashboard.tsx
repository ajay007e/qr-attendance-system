"use client";

import { EmptyState, Section, SectionHeader } from "@/shared";

import { CourseCard, StudentCourse } from "@/features/enrolments";

const testCourses: StudentCourse[] = [
  {
    id: 1,
    course_code: "CS101",
    course_name: "Introduction to Programming",
    description: "An introduction to programming concepts and problem solving.",
    credits: 6,
    session: "SUMMER",
    is_active: true,
    enrolled_at: new Date("2026-01-15").toString(),
  },
  {
    id: 2,
    course_code: "CS202",
    course_name: "Database Systems",
    description: "Fundamentals of relational databases, SQL, and database design.",
    credits: 6,
    session: "SUMMER",
    is_active: true,
    enrolled_at: new Date("2026-01-15").toString(),
  },
  {
    id: 3,
    course_code: "CS305",
    course_name: "Web Application Development",
    description: "Modern web application development using frontend and backend technologies.",
    credits: 6,
    session: "SUMMER",
    is_active: true,
    enrolled_at: new Date("2026-01-15").toString(),
  },
];

export default function LecturerDashboard() {
  const courses = testCourses;

  return (
    <Section>
      <SectionHeader
        title="My Courses"
        action={
          courses.length > 0 && (
            <span className="text-sm text-gray-500">
              {courses.length} course{courses.length === 1 ? "" : "s"}
            </span>
          )
        }
      />

      {courses.length === 0 ? (
        <EmptyState size="md" title="No courses assigned" message="You don't have any courses assigned to you yet." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </Section>
  );
}

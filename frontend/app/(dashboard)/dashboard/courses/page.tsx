"use client";

import { Plus, Search } from "lucide-react";
import { useState } from "react";

import PageHeader from "@/components/layout/AdminPageHeader";
import ComingSoon from "@/components/common/ComingSoon";
import CustomDropdown from "@/components/common/CustomDropDown";

const ENABLE_COURSE_DATA = true;

const demoCourses = [
  {
    id: 1,
    course_code: "CS101",
    course_name: "Introduction to Computer Science",
    description: "Basic computer science concepts.",
    semester: 1,
    year: 2026,
    is_active: true,
    lecturers: [
      {
        id: 1,
        name: "John Smith",
      },
    ],
  },

  {
    id: 2,
    course_code: "CS202",
    course_name: "Database Systems",
    description: null,
    semester: 2,
    year: 2026,
    is_active: false,
    lecturers: [],
  },
];

export default function CourseManagementPage() {
  const courses = ENABLE_COURSE_DATA ? demoCourses : [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <PageHeader
        title="Course Management"
        subtitle="Create, manage, and assign courses to lecturers."
      />

      {courses.length === 0 ? (
        <EmptyCourseState />
      ) : (
        <CourseTable courses={courses} />
      )}
    </div>
  );
}

function EmptyCourseState() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
text-sm
font-semibold
text-white
hover:bg-blue-700
"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <ComingSoon
        title="No Courses Available"
        message="Create courses and assign lecturers to start managing academic activities."
        size="lg"
      />
    </div>
  );
}

function CourseTable({ courses }: { courses: typeof demoCourses }) {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.course_name.toLowerCase().includes(search.toLowerCase()) ||
      course.course_code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" ||
      (status === "ACTIVE" && course.is_active) ||
      (status === "INACTIVE" && !course.is_active);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}

      <div
        className="
space-y-4
rounded-2xl
border
border-gray-200
bg-white
p-4
shadow-sm
"
      >
        <div
          className="
flex
flex-col
gap-3

xl:flex-row
xl:items-center
xl:justify-between
"
        >
          {/* Search */}

          <div
            className="
relative
w-full
xl:max-w-md
"
          >
            <Search
              size={18}
              className="
absolute
left-3
top-1/2
-translate-y-1/2
text-gray-400
"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          pl-10
          pr-4
          text-sm
          text-gray-900
          placeholder:text-gray-400
          outline-none

          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
            />
          </div>

          <div
            className="
flex
flex-col
gap-3

sm:flex-row
"
          >
            <CustomDropdown
              value={status}
              onChange={setStatus}
              options={[
                {
                  label: "All Status",
                  value: "ALL",
                },
                {
                  label: "Active",
                  value: "ACTIVE",
                },
                {
                  label: "Inactive",
                  value: "INACTIVE",
                },
              ]}
            />

            <button
              className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
text-sm
font-semibold
text-white
hover:bg-blue-700
"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* Table */}

      <div
        className="
overflow-hidden
rounded-2xl
border
border-gray-200
bg-white
shadow-sm
"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Course Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Semester
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Year
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Lecturers
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {course.course_code}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {course.course_name}
                    </p>

                    {course.description && (
                      <p className="mt-1 text-xs text-gray-500">
                        {course.description}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    Semester {course.semester}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.year}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.lecturers.length
                      ? course.lecturers.map((l: any) => l.name).join(", ")
                      : "No Lecturer"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
rounded-full
px-3
py-1
text-xs
font-medium

${course.is_active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}
`}
                    >
                      {course.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="
text-sm
font-medium
text-blue-600
hover:text-blue-700
"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}

      <div
        className="
flex
flex-col
gap-4
rounded-xl
border
border-gray-200
bg-white
px-5
py-4

sm:flex-row
sm:items-center
sm:justify-between
"
      >
        <p className="text-sm text-gray-600">
          Showing {filteredCourses.length} courses
        </p>

        <div className="flex gap-2">
          <button className="rounded-lg border px-3 py-2">Previous</button>

          <button className="rounded-lg bg-blue-600 px-3 py-2 text-white">
            1
          </button>

          <button className="rounded-lg border px-3 py-2">Next</button>
        </div>
      </div>
    </div>
  );
}

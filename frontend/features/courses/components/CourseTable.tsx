import { Pencil } from "lucide-react";

import { Badge, IconButton } from "@/shared";

import { Course, CourseActionProps, CourseTableProps } from "../types";

export default function CourseTable({ courses, onEdit }: CourseTableProps) {
  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onEdit={onEdit} />
        ))}
      </div>

      {/* Desktop */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          md:block
        "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead
              className="
                bg-gray-50
                text-gray-900
              "
            >
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Credits
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Session
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Lecturers
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <CourseTableRow
                  key={course.id}
                  course={course}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function CourseCard({ course, onEdit }: CourseActionProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{course.course_code}</h3>

          <p className="mt-1 font-medium text-gray-700">{course.course_name}</p>

          {course.description && (
            <p className="mt-1 text-sm text-gray-500">{course.description}</p>
          )}
        </div>

        <IconButton
          onClick={() => onEdit(course)}
          ariaLabel={`Edit ${course.course_name}`}
          title="Edit Course"
          className="
            text-blue-600
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          <Pencil size={18} />
        </IconButton>
      </div>

      <div
        className="
          mt-4
          space-y-3
          border-t
          pt-4
        "
      >
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Credits</span>

          <span className="font-medium">{course.credits}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Session</span>

          <span className="font-medium">{formatSession(course.session)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Status</span>

          <Badge variant={course.is_active ? "green" : "red"}>
            {course.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function CourseTableRow({ course, onEdit }: CourseActionProps) {
  return (
    <tr
      className="
        transition-colors
        hover:bg-gray-50
      "
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {course.course_code}
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {course.course_name}
          </p>

          {course.description && (
            <p className="mt-1 max-w-xs text-sm text-gray-500">
              {course.description}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{course.credits}</td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {formatSession(course.session)}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">No lecturers</td>

      <td className="px-6 py-4">
        <Badge variant={course.is_active ? "green" : "red"}>
          {course.is_active ? "Active" : "Inactive"}
        </Badge>
      </td>

      <td className="px-6 py-4">
        <IconButton
          onClick={() => onEdit(course)}
          ariaLabel={`Edit ${course.course_name}`}
          title="Edit Course"
          className="
            text-blue-600
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          <Pencil size={18} />
        </IconButton>
      </td>
    </tr>
  );
}

function formatSession(session: string) {
  return session
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

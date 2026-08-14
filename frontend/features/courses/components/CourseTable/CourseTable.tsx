import { CourseTableProps } from "../../types";
import { CourseCard } from "./CourseCard";
import { CourseTableRow } from "./CourseTableRow";

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
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Code</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Credits</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Session</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <CourseTableRow key={course.id} course={course} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

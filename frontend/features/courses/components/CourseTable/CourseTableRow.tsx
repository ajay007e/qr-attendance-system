import { Badge, IconButton } from "@/shared";
import { Pencil } from "lucide-react";
import { formatSession } from "./course-table.utils";
import { CourseActionProps } from "../../types";

export function CourseTableRow({ course, onEdit }: CourseActionProps) {
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

import { Pencil } from "lucide-react";

import { Button, Badge } from "@/shared";

import { CourseActionProps } from "./types";

export function CourseTableRow({ course, onEdit }: CourseActionProps) {
  return (
    <tr
      className="
        transition-colors
        hover:bg-gray-50
      "
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-700">{course.courseCode}</td>

      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-700">{course.courseName}</p>

          {course.description && <p className="mt-1 max-w-xs text-sm text-gray-500">{course.description}</p>}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{course.credits}</td>

      <td className="px-6 py-4">
        <Badge variant={course.isActive ? "green" : "red"}>{course.isActive ? "Active" : "Inactive"}</Badge>
      </td>

      <td className="px-6 py-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(course)}
          aria-label={`Edit ${course.courseName}`}
          title={"Edit User"}
        >
          <Pencil size={18} />
        </Button>
      </td>
    </tr>
  );
}

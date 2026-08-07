import { Badge, IconButton } from "@/shared";
import { CourseActionProps } from "../../types";
import { Pencil } from "lucide-react";
import { formatSession } from "./course-table.utils";

export function CourseCard({ course, onEdit }: CourseActionProps) {
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

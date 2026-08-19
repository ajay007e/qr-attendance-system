import { Badge, Button } from "@/shared";
import { CourseActionProps } from "./types";
import { Pencil } from "lucide-react";

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
          <h3 className="font-semibold text-gray-900">{course.courseCode}</h3>

          <p className="mt-1 font-medium text-gray-700">{course.courseName}</p>

          {course.description && <p className="mt-1 text-sm text-gray-500">{course.description}</p>}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(course)}
          aria-label={`Edit ${course.courseName}`}
          title={"Edit User"}
        >
          <Pencil size={18} />
        </Button>
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

        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Status</span>

          <Badge variant={course.isActive ? "green" : "red"}>{course.isActive ? "Active" : "Inactive"}</Badge>
        </div>
      </div>
    </div>
  );
}

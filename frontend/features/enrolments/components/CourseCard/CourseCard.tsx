import { BookOpen } from "lucide-react";

import { COURSE_SESSION_OPTIONS } from "@/features/courses/constants";

import type { CourseCardProps } from "../../types";

const SESSION_LABELS = Object.fromEntries(
  COURSE_SESSION_OPTIONS.map((option) => [option.value, option.label]),
);

export default function CourseCard({ course, action }: CourseCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      <div className="flex min-w-0 gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <BookOpen size={20} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {course.course_code}
            </span>

            <span
              className="
                rounded-full
                bg-gray-100
                px-2.5
                py-0.5
                text-xs
                font-medium
                text-gray-600
              "
            >
              {SESSION_LABELS[course.session] ?? course.session} · {course.credits} credits
            </span>
          </div>

          <h3 className="mt-1 truncate text-base font-medium text-gray-900">
            {course.course_name}
          </h3>

          {course.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {course.description}
            </p>
          )}
        </div>
      </div>

      {action && <div className="shrink-0 sm:pl-4">{action}</div>}
    </div>
  );
}

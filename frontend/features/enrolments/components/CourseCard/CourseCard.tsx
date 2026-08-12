import Link from "next/link";
import { BookOpen } from "lucide-react";

import { Badge } from "@/shared";

import type { CourseCardProps } from "../../types";
import { COURSE_SESSION_LABELS } from "../../constants";

export default function CourseCard({ course, action }: CourseCardProps) {
  const card = (
    <div
      className="
        flex
        h-full
        min-h-64
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
      "
    >
      <div className="flex min-w-0 items-start gap-4">
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

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {course.course_code}
            </span>

            <Badge variant={course.is_active ? "green" : "gray"}>
              {course.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <h3 className="mt-1 text-base font-medium text-gray-900">
            {course.course_name}
          </h3>
        </div>
      </div>

      <p className="line-clamp-3 flex-1 text-sm text-gray-500">
        {course.description || "No course description available."}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>
          {COURSE_SESSION_LABELS[course.session] ?? course.session}
        </Badge>
        <Badge>{course.credits} credits</Badge>
      </div>

      {action && <div className="mt-auto">{action}</div>}
    </div>
  );

  if (action) {
    return card;
  }

  return (
    <Link
      href={`/course/${course.id}`}
      aria-label={`View ${course.course_code} details`}
      className="block rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100"
    >
      {card}
    </Link>
  );
}

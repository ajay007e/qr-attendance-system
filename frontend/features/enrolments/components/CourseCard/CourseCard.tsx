import Link from "next/link";
import { BookOpen } from "lucide-react";

import type { CourseCardProps } from "../../types";
import { getCourseCardGradient } from "../../utils";

export default function CourseCard({ course, action, href }: CourseCardProps) {
  const gradient = getCourseCardGradient(course.course_code);

  const card = (
    <div className="flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className={`flex h-40 shrink-0 items-center justify-center bg-gradient-to-br ${gradient}`}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-gray-700 shadow-sm ring-1 ring-white/80">
          <BookOpen size={26} strokeWidth={1.7} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-sm font-semibold text-gray-500">{course.course_code}</span>

        <h3 className="mt-1 truncate text-base font-semibold leading-snug text-gray-900" title={course.course_name}>
          {course.course_name}
        </h3>

        {action && <div className="mt-auto pt-5">{action}</div>}
      </div>
    </div>
  );

  if (action) {
    return card;
  }

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      aria-label={`View ${course.course_code} details`}
      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
    >
      {card}
    </Link>
  );
}

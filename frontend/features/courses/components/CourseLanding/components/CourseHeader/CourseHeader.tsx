import { BookOpen } from "lucide-react";
import { CourseHeaderProps } from "../../types";
import { getSessionLabel } from "@/features/courses/constants";
import { Badge } from "@/shared";

export function CourseHeader({ course, gradient }: CourseHeaderProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className={`flex min-h-52 items-center bg-gradient-to-br ${gradient} px-6 py-8 md:px-10`}>
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-gray-700 shadow-sm ring-1 ring-white/80">
              <BookOpen size={28} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">{course.course_code}</p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{course.course_name}</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                {course.description || "Course information and learning resources."}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Badge variant="amber">{course.credits} credits</Badge>
            <Badge variant="blue">{getSessionLabel(course.session)}</Badge>
            {/*<Badge variant={course.is_active ? "green" : "red"}>{course.is_active ? "Active" : "Inactive"}</Badge>*/}
          </div>
        </div>
      </div>
    </section>
  );
}

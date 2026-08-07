import { BookOpen } from "lucide-react";

import type { EmptyCourseStateProps } from "../../types";

export default function EmptyCourseState({ onCreate }: EmptyCourseStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        py-12
        text-center
        shadow-sm
      "
    >
      <div
        className="
          mb-4
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-blue-100
          text-blue-600
        "
      >
        <BookOpen size={28} />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-gray-900
        "
      >
        No courses found
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          text-gray-500
        "
      >
        There are no courses available yet. Create a new course to start
        managing your academic sessions and lecturers.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="
          mt-6
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          focus:outline-none
          focus:ring-4
          focus:ring-blue-200
        "
      >
        Create Course
      </button>
    </div>
  );
}

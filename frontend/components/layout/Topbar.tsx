"use client";

import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-4
        shadow-sm
        sm:px-6
      "
    >
      {/* Left */}
      <div>
        <h1
          className="
            text-lg
            font-bold
            text-gray-900
          "
        >
          Attendance System
        </h1>
      </div>

      {/* Right */}
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        {/* Notification */}
        <button
          className="
            rounded-full
            p-2
            text-gray-600
            transition
            hover:bg-gray-100
            hover:text-blue-600
          "
        >
          <Bell size={21} />
        </button>
      </div>
    </header>
  );
}

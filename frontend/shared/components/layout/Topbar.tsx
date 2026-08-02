"use client";

import { Bell, Menu } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">
          Attendance System
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
          aria-label="Notifications"
        >
          <Bell size={21} />
        </button>
      </div>
    </header>
  );
}

"use client";

import { Bell, Menu } from "lucide-react";

import { TopbarProps } from "./types";
import { Button } from "@/shared";

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="lg:hidden hover:text-blue-600"
        >
          <Menu size={22} />
        </Button>

        <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">
          Attendance System
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="hover:text-blue-600"
        >
          <Bell size={21} />
        </Button>
      </div>
    </header>
  );
}

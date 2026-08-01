"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/auth.context";
import { menus } from "@/components/navigation/menu";

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  if (!user) return null;

  const items = menus[user.role as keyof typeof menus];

  return (
    <nav className="flex h-full flex-col overflow-hidden">
      {/* Navigation */}
      <div className="flex-1 space-y-2 overflow-y-auto p-5">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600",
              ].join(" ")}
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Profile */}
      <div className="relative border-t border-gray-200 p-5">
        {open && (
          <div className="absolute bottom-20 left-5 right-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <button
              disabled
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400"
            >
              <User size={18} />
              Profile
            </button>

            <button
              disabled
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400"
            >
              <Settings size={18} />
              Settings
            </button>

            <div className="border-t border-gray-100" />

            <button
              onClick={logout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.email}
              </p>

              <p className="capitalize text-xs text-gray-500">{user.role}</p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}

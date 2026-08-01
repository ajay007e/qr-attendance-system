"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/auth.context";
import { menus } from "@/components/navigation/menu";

export default function Sidebar() {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  if (!user) return null;

  const items = menus[user.role as keyof typeof menus];

  return (
    <nav
      className="
        flex
        h-full
        flex-col
        p-5
      "
    >
      {/* Menu Items */}

      <div className="flex flex-1 flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Profile Dropdown */}

      <div className="relative border-t border-gray-200 pt-4">
        {open && (
          <div
            className="
                absolute
                bottom-16
                left-0
                w-full
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-lg
              "
          >
            {/* Disabled */}

            <button
              disabled
              className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-gray-400
                  cursor-not-allowed
                "
            >
              <User size={18} />
              Profile
            </button>

            <button
              disabled
              className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-gray-400
                  cursor-not-allowed
                "
            >
              <Settings size={18} />
              Settings
            </button>

            <div className="border-t border-gray-100" />

            <button
              onClick={logout}
              className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            bg-gray-50
            px-4
            py-3
            transition
            hover:bg-gray-100
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-sm
                font-semibold
                text-blue-600
              "
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <div className="text-left">
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                "
              >
                {user.email}
              </p>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                {user.role}
              </p>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`
              text-gray-500
              transition-transform
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>
      </div>
    </nav>
  );
}

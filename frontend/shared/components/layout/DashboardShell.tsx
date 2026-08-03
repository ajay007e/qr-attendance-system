"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { DashboardShellProps } from "./types";

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scrolling while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-gray-200 bg-white shadow-sm lg:flex">
          <Sidebar />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
              aria-label="Close navigation"
            >
              <X size={22} />
            </button>
          </div>

          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

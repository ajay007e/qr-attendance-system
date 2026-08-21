"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { DashboardShellProps } from "./types";
import Button from "../ui/button";
import { Container } from "..";

export default function DashboardShell({ children, user, items, onLogout }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <div className="shrink-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden h-full w-72 shrink-0 border-r border-gray-200 bg-white shadow-sm lg:flex">
          <Sidebar user={user} items={items} onLogout={onLogout} />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            >
              <X size={22} aria-hidden="true" />
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <Sidebar user={user} items={items} onLogout={onLogout} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Container>{children}</Container>
        </main>
      </div>

      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}

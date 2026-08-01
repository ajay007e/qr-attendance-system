"use client";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Full Width Topbar */}
      <Topbar />

      {/* Middle Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="
            hidden
            lg:block
            w-72
            border-r
            bg-white
            shadow-sm
          "
        >
          <Sidebar />
        </aside>

        {/* Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </main>
      </div>

      {/* Full Width Footer */}
      <Footer />
    </div>
  );
}

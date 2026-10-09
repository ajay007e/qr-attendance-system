import type { Metadata, Viewport } from "next";

import "./globals.css";

import { AuthProvider } from "@/features/auth";
import { ErrorProvider, GlobalError, ServiceWorker, ToastProvider } from "@/shared";

export const metadata: Metadata = {
  title: "QR Attendance System",
  description: "Manage classes and record attendance with QR codes.",
  applicationName: "QR Attendance",
  appleWebApp: { capable: true, title: "Attendance", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ServiceWorker />
        <ErrorProvider>
          <AuthProvider>
            <ToastProvider position="top-right" newestOn="top" maxToasts={5}>
              <GlobalError />
              {children}
            </ToastProvider>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}

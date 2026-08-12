import "./globals.css";

import { AuthProvider } from "@/features/auth";
import { ErrorProvider, GlobalError } from "@/shared";
import { ToastProvider } from "@/shared/components/feedback/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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

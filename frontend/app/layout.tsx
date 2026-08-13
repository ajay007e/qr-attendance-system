import "./globals.css";

import { AuthProvider } from "@/features/auth";
import { ErrorProvider, GlobalError, ToastProvider } from "@/shared";

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

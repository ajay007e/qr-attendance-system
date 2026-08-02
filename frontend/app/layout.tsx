import "./globals.css";
import { AuthProvider } from "@/features/auth";
import { ErrorProvider, GlobalError } from "@/shared";
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
            <GlobalError />
            {children}
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}

import { AuthRedirect } from "@/features/auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthRedirect>{children}</AuthRedirect>;
}

import { SessionUser } from "@/shared";
import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export type DashboardShellProps = {
  children: React.ReactNode;
  user: SessionUser;
  items: readonly SidebarItem[];
  onLogout: () => void;
};

export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarProps = {
  user: SessionUser;
  items: readonly SidebarItem[];
  onLogout: () => void;
  onNavigate?: () => void;
};

export interface TopbarProps {
  onMenuClick?: () => void;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

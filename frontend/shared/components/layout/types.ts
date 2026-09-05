import { ReactNode } from "react";

import { SessionUser } from "@/shared";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export type DashboardShellProps = {
  children: ReactNode;
  user: SessionUser;
  items: readonly SidebarItem[];
  onLogout: () => void;
  topbarActions?: ReactNode;
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
  user: SessionUser;
  onMenuClick?: () => void;
  actions?: ReactNode;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

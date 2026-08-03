import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export interface DashboardShellProps {
  children: ReactNode;
}

export interface SidebarProps {
  onNavigate?: () => void;
}

export interface TopbarProps {
  onMenuClick?: () => void;
}

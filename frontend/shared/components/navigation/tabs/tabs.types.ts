import type { ReactNode } from "react";

export type TabsVariant = "segmented" | "underline" | "pills";

export type TabsSize = "sm" | "md" | "lg";

export type TabsWidth = "full" | "auto";

export interface TabItem<TKey extends string = string> {
  key: TKey;
  label?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  panelId?: string;
}

export interface TabsProps<TKey extends string = string> {
  tabs: readonly TabItem<TKey>[];

  value: TKey;

  onChange: (value: TKey) => void;

  variant?: TabsVariant;

  size?: TabsSize;

  width?: TabsWidth;

  className?: string;

  /**
   * Allows consumers to customize the active tab styling
   * without replacing the entire Tabs component.
   */
  activeClassName?: string;

  /**
   * Allows consumers to customize the inactive tab styling.
   */
  inactiveClassName?: string;

  /**
   * Allows consumers to provide an accessible label
   * for the tab list.
   */
  ariaLabel?: string;

  /**
   * When enabled, tabs can be horizontally scrolled
   * on smaller screens instead of wrapping.
   */
  scrollable?: boolean;
}

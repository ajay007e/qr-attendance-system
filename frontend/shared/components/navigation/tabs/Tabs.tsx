"use client";

import { type KeyboardEvent, type ReactNode, useId, useMemo, useRef } from "react";

import {
  tabBadgeVariants,
  tabButtonVariants,
  tabIconVariants,
  tabLabelVariants,
  tabsListStyles,
  tabsScrollAreaStyles,
  tabsVariants,
} from "./tabs.styles";
import type { TabsProps } from "./tabs.types";

function getTabId(prefix: string, key: string): string {
  return `${prefix}-tab-${key}`;
}

function getPanelId(prefix: string, key: string): string {
  return `${prefix}-panel-${key}`;
}

export default function Tabs<TKey extends string = string>({
  tabs,
  value,
  onChange,
  variant = "segmented",
  size = "md",
  width = "full",
  className,
  activeClassName,
  inactiveClassName,
  ariaLabel = "Tabs",
  scrollable = true,
}: TabsProps<TKey>) {
  const generatedId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabIdPrefix = useMemo(() => `tabs-${generatedId.replace(/:/g, "")}`, [generatedId]);

  const enabledTabIndexes = useMemo(
    () =>
      tabs.reduce<number[]>((indexes, tab, index) => {
        if (!tab.disabled) {
          indexes.push(index);
        }

        return indexes;
      }, []),
    [tabs],
  );

  function focusTab(index: number) {
    const tab = tabRefs.current[index];

    if (!tab) {
      return;
    }

    tab.focus();
  }

  function focusRelativeTab(currentIndex: number, direction: "next" | "previous") {
    if (enabledTabIndexes.length === 0) {
      return;
    }

    const currentEnabledIndex = enabledTabIndexes.indexOf(currentIndex);

    if (currentEnabledIndex === -1) {
      return;
    }

    const offset = direction === "next" ? 1 : -1;

    const nextEnabledIndex = (currentEnabledIndex + offset + enabledTabIndexes.length) % enabledTabIndexes.length;

    focusTab(enabledTabIndexes[nextEnabledIndex]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusRelativeTab(index, "next");
        break;

      case "ArrowLeft":
        event.preventDefault();
        focusRelativeTab(index, "previous");
        break;

      case "Home":
        event.preventDefault();

        if (enabledTabIndexes.length > 0) {
          focusTab(enabledTabIndexes[0]);
        }

        break;

      case "End":
        event.preventDefault();

        if (enabledTabIndexes.length > 0) {
          focusTab(enabledTabIndexes[enabledTabIndexes.length - 1]);
        }

        break;

      case "Enter":
      case " ":
        event.preventDefault();

        if (!tabs[index].disabled) {
          onChange(tabs[index].key);
        }

        break;

      default:
        break;
    }
  }

  const containerClassName = [
    tabsVariants({
      variant,
      width,
      scrollable,
    }),
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} role="tablist" aria-label={ariaLabel} aria-orientation="horizontal">
      <div className={[scrollable ? tabsScrollAreaStyles : "", "w-full"].filter(Boolean).join(" ")}>
        <div className={tabsListStyles}>
          {tabs.map((tab, index) => {
            const isActive = value === tab.key;

            const tabId = getTabId(tabIdPrefix, tab.key);

            const panelId = tab.panelId ?? getPanelId(tabIdPrefix, tab.key);

            const buttonClassName = [
              tabButtonVariants({
                variant,
                size,
                width,
              }),
              isActive ? (activeClassName ?? "") : (inactiveClassName ?? ""),
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={tab.key}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                aria-disabled={tab.disabled || undefined}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                data-active={isActive}
                className={buttonClassName}
                onClick={() => {
                  if (!tab.disabled) {
                    onChange(tab.key);
                  }
                }}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {tab.icon && (
                  <span
                    className={tabIconVariants({
                      size,
                      active: isActive,
                    })}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                )}

                {tab.label && (
                  <span
                    className={tabLabelVariants({
                      size,
                    })}
                  >
                    {tab.label}
                  </span>
                )}

                {tab.badge !== undefined && (
                  <span
                    className={tabBadgeVariants({
                      size,
                      active: isActive,
                    })}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface TabsPanelProps {
  id: string;
  active: boolean;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

export function TabsPanel({ id, active, labelledBy, children, className }: TabsPanelProps) {
  if (!active) {
    return null;
  }

  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className={["outline-none", className ?? ""].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

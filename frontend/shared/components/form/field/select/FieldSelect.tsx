"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";

import { useFieldContext } from "../field.context";

import { selectButtonVariants, selectDropdownVariants, selectOptionVariants } from "./select.styles";
import type { FieldSelectProps } from "./select.types";

export default function FieldSelect<T>({
  value,
  options,
  onChange,
  placeholder = "Select",
  disabled,
  fullWidth = true,
  renderOption,
  className,
}: FieldSelectProps<T>) {
  const field = useFieldContext();

  const [open, setOpen] = React.useState(false);

  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function close(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  function toggleDropdown() {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const itemHeight = 48;

      const maxHeight = Math.min(options.length * itemHeight, 240);

      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - rect.bottom;

      const spaceAbove = rect.top;

      const openUp = spaceBelow < maxHeight && spaceAbove > spaceBelow;

      let top = openUp ? rect.top - maxHeight - 8 : rect.bottom + 8;

      if (top < 8) {
        top = 8;
      }

      if (top + maxHeight > viewportHeight - 8) {
        top = viewportHeight - maxHeight - 8;
      }

      setPosition({
        top,
        left: rect.left,
        width: rect.width,
      });
    }

    setOpen((prev) => !prev);
  }

  const selectedOption = options.find((option) => option.value === value);

  const isDisabled = disabled ?? field?.disabled;

  return (
    <div ref={containerRef} className="relative">
      <button
        id={field?.id}
        type="button"
        disabled={isDisabled}
        aria-expanded={open}
        aria-describedby={field?.describedBy}
        onClick={toggleDropdown}
        className={cn(
          selectButtonVariants({
            disabled: isDisabled,
            fullWidth,
          }),
          className,
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <ChevronDown size={18} className={cn("text-gray-500 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: position.width,
          }}
          className={selectDropdownVariants()}
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={selectOptionVariants({
                  selected,
                })}
              >
                {renderOption ? renderOption(option, selected) : option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CustomDropdownProps, DropdownPosition } from "./types";

export default function CustomDropdown<T extends string>({
  value,
  options,
  onChange,
  placeholder = "Select",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
    direction: "down",
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function toggleDropdown() {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();

      const dropdownHeight = Math.min(options.length * 48, 240);
      const spaceBelow = window.innerHeight - rect.bottom;

      const shouldOpenUp =
        spaceBelow < dropdownHeight && rect.top > dropdownHeight;

      setPosition({
        left: rect.left,
        width: rect.width,
        top: shouldOpenUp ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
        direction: shouldOpenUp ? "up" : "down",
      });
    }

    setOpen(!open);
  }

  const selected = options.find((item) => item.value === value)?.label;

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 shadow-sm transition hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        <span className="truncate">{selected ?? placeholder}</span>

        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            width: position.width,
          }}
          className="z-[9999] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full px-4 py-3 text-left text-sm transition ${
                option.value === value
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

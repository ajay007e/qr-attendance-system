"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((option) => option.value === value)?.label;

  return (
    <div ref={ref} className="relative w-full sm:w-44">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-700
          shadow-sm
          transition

          hover:border-blue-400

          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <span>{selected ?? placeholder}</span>

        <ChevronDown
          size={18}
          className={`
            text-gray-500
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-lg
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                flex
                w-full
                px-4
                py-3
                text-left
                text-sm
                transition

                ${
                  option.value === value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

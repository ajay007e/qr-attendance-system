import { FormInputProps } from "./types";

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
  required,
  autoComplete,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-12
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          text-gray-900
          placeholder:text-gray-400
          outline-none
          transition

          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100

          disabled:cursor-not-allowed
          disabled:opacity-60

          ${className}
        `}
        {...props}
      />
    </div>
  );
}

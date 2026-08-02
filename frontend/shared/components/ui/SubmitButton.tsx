import { SubmitButtonProps } from "./types";

export default function SubmitButton({
  children,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="
        w-full
        rounded-xl
        bg-blue-600
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

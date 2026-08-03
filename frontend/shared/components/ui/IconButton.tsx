import { IconButtonProps } from "./types";

export default function IconButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  title,
  className = "",
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={`
        rounded-lg
        p-2
        transition
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}

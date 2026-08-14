import { BADGE_VARIENT_CLASSES } from "./constants";
import { BadgeProps } from "./types";

export default function Badge({ children, variant = "gray", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${BADGE_VARIENT_CLASSES[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

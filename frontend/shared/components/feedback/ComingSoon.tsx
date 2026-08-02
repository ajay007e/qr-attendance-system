import { Clock } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function ComingSoon({
  title = "Coming Soon",
  message = "This feature is currently under development.",
  size = "md",
}: ComingSoonProps) {
  const sizeStyles = {
    sm: {
      wrapper: "py-8",
      icon: "h-10 w-10",
      title: "text-base",
      message: "text-xs",
    },

    md: {
      wrapper: "py-16",
      icon: "h-14 w-14",
      title: "text-xl",
      message: "text-sm",
    },

    lg: {
      wrapper: "py-24",
      icon: "h-20 w-20",
      title: "text-2xl",
      message: "text-base",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        text-center
        ${styles.wrapper}
      `}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-blue-600
          ${styles.icon}
        `}
      >
        <Clock className="h-1/2 w-1/2" />
      </div>

      <h2
        className={`
          mt-5
          font-semibold
          text-gray-900
          ${styles.title}
        `}
      >
        {title}
      </h2>

      <p
        className={`
          mt-2
          max-w-md
          text-gray-500
          ${styles.message}
        `}
      >
        {message}
      </p>
    </div>
  );
}

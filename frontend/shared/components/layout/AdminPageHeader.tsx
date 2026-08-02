export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <section
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      {/* Text */}
      <div>
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-gray-900
            sm:text-3xl
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-2
              text-sm
              text-gray-600
              sm:text-base
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Action */}
      {action && <div className="w-full sm:w-auto">{action}</div>}
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section>
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
    </section>
  );
}

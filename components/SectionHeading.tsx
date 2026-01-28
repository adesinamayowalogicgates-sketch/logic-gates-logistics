interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-h1 font-semibold text-text-primary">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-body text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

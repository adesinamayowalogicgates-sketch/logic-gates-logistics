import Link from "next/link";

interface ServiceCardProps {
  title: string;
  summary: string;
  href: string;
}

export default function ServiceCard({ title, summary, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between card-base p-6 transition hover:-translate-y-1 hover:shadow-soft focus-ring"
    >
      <div>
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-off-white text-teal">
          <span className="text-lg">*</span>
        </div>
        <h3 className="text-h1 font-semibold text-text-primary">{title}</h3>
        <p className="mt-3 text-body text-muted">{summary}</p>
      </div>
      <span className="mt-6 text-body font-semibold text-text-primary">
      Explore service →

      </span>
    </Link>
  );
}

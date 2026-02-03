import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ServiceCard({
  title,
  summary,
  href,
  imageSrc,
  imageAlt
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft focus-ring"
    >
      <div>
        <div className="mb-5 overflow-hidden rounded-2xl">
          <div className="relative h-40 w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition duration-300 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
        </div>
        <h3 className="text-h1 font-semibold text-text-primary">{title}</h3>
        <p className="mt-3 text-body text-muted">{summary}</p>
      </div>
      <span className="mt-6 text-body font-semibold text-text-primary transition group-hover:underline group-hover:underline-offset-4">
        Explore service <span className="inline-block transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export default function StatusBadge({ status }: { status: string }) {
  const value = status.toUpperCase();

  const tone =
    value === "PAID" || value === "COMPLETED"
      ? "bg-emerald-100 text-emerald-800"
      : value === "ASSIGNED"
        ? "bg-blue-100 text-blue-800"
        : value === "PENDING_PAYMENT" || value === "PENDING"
          ? "bg-amber-100 text-amber-800"
          : value === "CANCELLED"
            ? "bg-rose-100 text-rose-800"
            : "bg-slate-100 text-slate-800";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${tone}`}>
      {value.replace("_", " ")}
    </span>
  );
}

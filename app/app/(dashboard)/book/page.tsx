import { redirect } from "next/navigation";

export default function BookRedirectPage() {
  redirect("/app/bookings/new");
}

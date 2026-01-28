import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role?.toLowerCase();

  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 as const };
  }

  if (role !== "admin" && role !== "ops") {
    return { error: "Forbidden", status: 403 as const };
  }

  return { session };
}

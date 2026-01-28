import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";

export async function GET(request: Request) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const paymentStatus = searchParams.get("paymentStatus");
  const search = searchParams.get("search");

  const bookings = await prisma.booking.findMany({
    where: {
      ...(status && status !== "all" ? { status } : {}),
      ...(paymentStatus && paymentStatus !== "all" ? { paymentStatus } : {}),
      ...(search
        ? {
            user: {
              OR: [
                { email: { contains: search } },
                { phone: { contains: search } }
              ]
            }
          }
        : {})
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, phone: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(bookings);
}

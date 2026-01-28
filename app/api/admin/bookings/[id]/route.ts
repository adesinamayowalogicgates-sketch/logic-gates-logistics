import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      transactions: true
    }
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

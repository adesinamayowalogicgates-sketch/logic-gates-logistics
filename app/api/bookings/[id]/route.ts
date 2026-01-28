import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const booking = await prisma.booking.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { transactions: true }
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

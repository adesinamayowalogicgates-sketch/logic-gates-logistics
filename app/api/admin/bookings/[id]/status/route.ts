import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminStatusSchema } from "@/lib/validation";
import { requireAdminSession } from "@/lib/admin";

interface Params {
  params: { id: string };
}

export async function POST(request: Request, { params }: Params) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const payload = await request.json();
    const data = adminStatusSchema.parse(payload);

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: data.status }
    });

    return NextResponse.json({ id: booking.id, status: booking.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}

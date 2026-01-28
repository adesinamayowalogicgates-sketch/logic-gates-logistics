import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminAssignmentSchema } from "@/lib/validation";
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
    const data = adminAssignmentSchema.parse(payload);

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        driverName: data.driverName ?? null,
        driverPhone: data.driverPhone ?? null,
        vehicleLabel: data.vehicleLabel ?? null,
        securityAssigned: data.securityAssigned ?? false,
        securityNotes: data.securityNotes ?? null
      }
    });

    return NextResponse.json({ id: booking.id, updated: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}

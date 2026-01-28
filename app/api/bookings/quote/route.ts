import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { calculatePrice } from "@/lib/pricing";
import type { ServiceType } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = quoteSchema.parse(payload);
    const breakdown = calculatePrice({
      serviceType: data.serviceType as ServiceType,
      vehicleType: data.vehicleType,
      securityQty: data.securityQty
    });

    return NextResponse.json(breakdown);
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}

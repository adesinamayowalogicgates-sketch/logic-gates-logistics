import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  if (payload.website) {
    return NextResponse.json({ status: "ok" });
  }

  console.log("Quote request received", {
    ...payload,
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({ status: "ok" });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  console.log("Quote request received", {
    ...payload,
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({ status: "ok" });
}

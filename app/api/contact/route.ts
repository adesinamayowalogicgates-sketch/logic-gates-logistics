import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  console.log("Contact request received", {
    ...payload,
    receivedAt: new Date().toISOString()
  });

  return NextResponse.json({ status: "ok" });
}

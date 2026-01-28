import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { walletAdjustSchema } from "@/lib/validation";
import { requireAdminSession } from "@/lib/admin";

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const payload = await request.json();
    const data = walletAdjustSchema.parse(payload);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: data.userId },
        select: { walletBalance: true }
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (data.type === "DEBIT" && user.walletBalance < data.amount) {
        throw new Error("Insufficient wallet balance");
      }

      const balanceChange = data.type === "CREDIT" ? data.amount : -data.amount;

      await tx.user.update({
        where: { id: data.userId },
        data: { walletBalance: { increment: balanceChange } }
      });

      await tx.walletTransaction.create({
        data: {
          userId: data.userId,
          type: data.type,
          amount: data.amount,
          source: data.source,
          note: data.note
        }
      });

      return { balance: user.walletBalance + balanceChange };
    });

    return NextResponse.json({ status: "ok", ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}

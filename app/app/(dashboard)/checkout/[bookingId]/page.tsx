import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PaystackPayButton from "@/components/PaystackPayButton";
import WalletPayButton from "@/components/WalletPayButton";
import { getBookingAmount, parsePriceBreakdown } from "@/lib/booking";

interface Params {
  params: { bookingId: string };
}

export default async function CheckoutPage({ params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  const booking = await prisma.booking.findFirst({
    where: { id: params.bookingId, userId }
  });

  if (!booking) {
    return notFound();
  }

  const breakdown = parsePriceBreakdown(booking.priceBreakdown);
  const amount = getBookingAmount({
    overrideAmount: booking.overrideAmount,
    paymentAmount: booking.paymentAmount,
    priceBreakdown: booking.priceBreakdown
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { walletBalance: true }
  });
  const walletBalance = user?.walletBalance ?? 0;
  const canPayWithWallet = walletBalance >= amount && booking.paymentStatus !== "PAID";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <p className="text-body text-muted">Checkout</p>
        <h1 className="text-h1 font-semibold text-text-primary">
          {booking.serviceType} · {booking.vehicleType}
        </h1>
      </div>

      <div className="card-base p-6">
        <div className="space-y-3 text-body text-muted">
          <div className="flex items-center justify-between">
            <span>Base price</span>
            <span>NGN {breakdown?.basePrice?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Vehicle</span>
            <span>{breakdown?.vehicleType ?? booking.vehicleType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Security fee</span>
            <span>NGN {breakdown?.securityFee?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-text-primary">
            <span>Total</span>
            <span>NGN {amount.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <PaystackPayButton bookingId={booking.id} />
          <WalletPayButton
            bookingId={booking.id}
            disabled={!canPayWithWallet}
            walletBalance={walletBalance}
            amount={amount}
          />
        </div>
      </div>

      <p className="text-body text-muted">
        Pay with Paystack to complete payment securely, or use your wallet balance if available.
      </p>
    </div>
  );
}

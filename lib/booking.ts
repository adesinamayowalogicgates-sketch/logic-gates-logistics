export type PriceBreakdown = {
  currency?: string;
  basePrice?: number;
  vehicleType?: string;
  securityUnitFee?: number;
  securityQty?: number;
  securityFee?: number;
  total?: number;
};

export function parsePriceBreakdown(value: unknown): PriceBreakdown | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as PriceBreakdown;
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    return value as PriceBreakdown;
  }

  return null;
}

export function getBookingAmount(params: {
  overrideAmount?: number | null;
  paymentAmount?: number | null;
  priceBreakdown?: unknown;
}) {
  if (typeof params.overrideAmount === "number") {
    return params.overrideAmount;
  }

  if (typeof params.paymentAmount === "number") {
    return params.paymentAmount;
  }

  const breakdown = parsePriceBreakdown(params.priceBreakdown);
  return breakdown?.total ?? 0;
}

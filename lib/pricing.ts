import { ServiceType, pricingTable } from "@/lib/constants";

const securityUnitFee = 25_000;

export function calculatePrice(params: {
  serviceType: ServiceType;
  vehicleType: string;
  securityQty: number;
}) {
  const basePrice =
    pricingTable[params.serviceType]?.[params.vehicleType] ?? 0;
  const securityFee = params.securityQty * securityUnitFee;
  const total = basePrice + securityFee;

  return {
    currency: "NGN",
    basePrice,
    vehicleType: params.vehicleType,
    securityUnitFee,
    securityQty: params.securityQty,
    securityFee,
    total
  };
}

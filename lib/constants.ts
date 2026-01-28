export const serviceTypes = [
  "Bus hire",
  "Airport pickup",
  "Luxury",
  "Intercity"
] as const;

export type ServiceType = (typeof serviceTypes)[number];

export const vehicleTypesByService: Record<ServiceType, string[]> = {
  "Bus hire": ["Mini Bus", "Coaster Bus", "Luxury Coach"],
  "Airport pickup": ["Executive Sedan", "Premium SUV"],
  Luxury: ["Executive Sedan", "Premium SUV", "Chauffeur Van"],
  Intercity: ["Premium SUV", "Luxury Coach", "Intercity Van"]
};

export const pricingTable: Record<ServiceType, Record<string, number>> = {
  "Bus hire": {
    "Mini Bus": 160_000,
    "Coaster Bus": 210_000,
    "Luxury Coach": 280_000
  },
  "Airport pickup": {
    "Executive Sedan": 45_000,
    "Premium SUV": 65_000
  },
  Luxury: {
    "Executive Sedan": 120_000,
    "Premium SUV": 165_000,
    "Chauffeur Van": 150_000
  },
  Intercity: {
    "Premium SUV": 220_000,
    "Luxury Coach": 300_000,
    "Intercity Van": 190_000
  }
};

export const bookingStatuses = [
  "draft",
  "pending_payment",
  "paid",
  "assigned",
  "completed",
  "cancelled"
] as const;

export const paymentStatuses = [
  "unpaid",
  "pending",
  "paid",
  "failed"
] as const;

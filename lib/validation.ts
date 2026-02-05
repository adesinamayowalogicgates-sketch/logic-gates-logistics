import { z } from "zod";
import { serviceTypes, vehicleTypesByService } from "@/lib/constants";

export const registerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  phone: z.string().min(7).optional(),
  company: z.string().optional(),
  password: z.string().min(8)
}).passthrough();

export const profileSchema = z.object({
  name: z.string().min(2),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  gender: z.string().min(2),
  dateOfBirth: z.string().min(4),
  phone: z.string().min(7),
  nationality: z.string().min(2),
  nextOfKinName: z.string().min(2),
  nextOfKinGender: z.string().min(2),
  nextOfKinPhone: z.string().min(7),
  company: z.string().optional()
});

export const bookingPayloadSchema = z.object({
  serviceType: z.enum(serviceTypes),
  pickupLocation: z.string().min(2),
  dropoffLocation: z.string().min(2),
  pickupTime: z.string().min(1),
  passengers: z.number().min(1).max(200),
  vehicleType: z.string().min(1),
  notes: z.string().optional(),
  securityRequired: z.boolean(),
  securityQty: z.number().min(0).max(5),
  priceBreakdown: z.any()
});

export const quoteSchema = z.object({
  serviceType: z.enum(serviceTypes),
  vehicleType: z.string().min(1),
  securityQty: z.number().min(0).max(5)
});

export const adminStatusSchema = z.object({
  status: z.enum([
    "DRAFT",
    "PENDING_PAYMENT",
    "PAID",
    "ASSIGNED",
    "COMPLETED",
    "CANCELLED"
  ])
});

export const adminAssignmentSchema = z.object({
  driverName: z.string().min(2).optional().nullable(),
  driverPhone: z.string().min(7).optional().nullable(),
  vehicleLabel: z.string().min(2).optional().nullable(),
  securityAssigned: z.boolean().optional(),
  securityNotes: z.string().max(500).optional().nullable()
});

export const adminOverrideSchema = z.object({
  overrideAmount: z.number().int().min(0),
  overrideReason: z.string().min(3).max(240)
});

export const walletPaySchema = z.object({
  bookingId: z.string().min(3)
});

export const walletAdjustSchema = z.object({
  userId: z.string().min(3),
  type: z.enum(["CREDIT", "DEBIT"]),
  amount: z.number().int().min(1),
  note: z.string().min(3).max(240),
  source: z.enum(["ADMIN_ADJUSTMENT"])
});

export const bookingWizardSchema = z.object({
  serviceType: z.enum(serviceTypes),
  pickupLocation: z.string().min(2),
  dropoffLocation: z.string().min(2),
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
  passengers: z.number().min(1).max(200),
  vehicleType: z.string().min(1),
  notes: z.string().optional(),
  securityRequired: z.boolean(),
  securityQty: z.number().min(0).max(5)
}).refine((data) => {
  const options = vehicleTypesByService[data.serviceType];
  return options.includes(data.vehicleType);
}, {
  message: "Vehicle type not allowed for selected service",
  path: ["vehicleType"]
});

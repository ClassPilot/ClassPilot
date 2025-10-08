import { z } from "zod";

export const studentSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(5, { message: "Age must be at least 5" })
    .max(18, { message: "Age must be 18 or less" }),
  gender: z.string().optional(),
  notes: z.string().optional(),
  email: z
    .string()
    .email({ message: "Invalid student email" })
    .optional()
    .or(z.literal("")),
  parentEmail: z
    .string()
    .email({ message: "Invalid parent email" })
    .optional()
    .or(z.literal("")),
  parentPhone: z.string().optional(),
});

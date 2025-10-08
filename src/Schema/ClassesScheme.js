import { z } from "zod";

export const classSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Class name must be at least 2 characters" }),
  description: z.string().optional(),
  subject: z.string().optional(),
  grade_level: z
    .number({ invalid_type_error: "Grade level must be a number" })
    .min(1, { message: "Grade level must be at least 1" })
    .max(12, { message: "Grade level must be at most 12" })
    .optional(),
  schedule: z.string().optional(),
  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, { message: "Capacity must be at least 1" })
    .optional(),
});

import { z } from "zod";

export const quickFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address").max(254),
  interest: z.enum(["fund", "mentor", "partner"], {
    invalid_type_error: "Please select a valid area of interest.",
  }),
  message: z
    .string()
    .max(2000, "Message must be under 2000 characters")
    .optional(),
});

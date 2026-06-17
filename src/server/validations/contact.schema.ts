import { z } from "zod";

export const quickFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  interest: z.enum(["fund", "mentor", "partner"], {
    invalid_type_error: "Please select a valid area of interest.",
  }),
  message: z.string().optional(),
});

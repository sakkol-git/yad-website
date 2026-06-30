import { z } from "zod";
import { createClient } from "@/shared/lib/supabase/server";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { requireAdmin, requireAuth, requireAdminOrManager } from "@/server/permissions";
import { SupabaseClient, User } from "@supabase/supabase-js";

export type ActionState<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type RoleRequirement = "public" | "authenticated" | "admin" | "manager";

interface SafeActionConfig<T extends z.ZodType<any, any, any>> {
  schema?: T;
  role?: RoleRequirement;
}

export interface ActionContext {
  sessionClient: SupabaseClient;
  adminClient: SupabaseClient;
  user: User | null;
}

/**
 * createSafeAction: A Higher-Order Function for Next.js Server Actions.
 * - Parses input (either raw objects or FormData) against a Zod schema.
 * - Enforces role-based access control.
 * - Injects Supabase clients and the authenticated user into the handler.
 */
export function createSafeAction<T extends z.ZodType<any, any, any>, R>(
  config: SafeActionConfig<T>,
  handler: (parsedInput: z.infer<T>, ctx: ActionContext) => Promise<R>,
) {
  // We return a function that matches standard Action signatures.
  // It handles both standard React useActionState (prevState, formData) and direct invocations (input).
  return async (arg1: any, arg2?: any): Promise<ActionState<R>> => {
    try {
      let input: any = arg1;

      // Handle React useFormState/useActionState signature: (prevState, formData)
      if (arg2 instanceof FormData) {
        input = arg2;
      }

      let parsedInput: z.infer<T> = input;

      // 1. Validate Schema
      if (config.schema) {
        if (input instanceof FormData) {
          const obj = Object.fromEntries(input.entries());
          const result = config.schema.safeParse(obj);
          if (!result.success) {
            const firstError = result.error.errors[0]?.message || "Validation failed";
            return { success: false, error: firstError };
          }
          parsedInput = result.data;
        } else {
          const result = config.schema.safeParse(input);
          if (!result.success) {
            const firstError = result.error.errors[0]?.message || "Validation failed";
            return { success: false, error: firstError };
          }
          parsedInput = result.data;
        }
      }

      // 2. Auth & Context
      const sessionClient = await createClient();
      let user: User | null = null;

      if (config.role && config.role !== "public") {
        if (config.role === "admin") {
          user = await requireAdmin(sessionClient);
        } else if (config.role === "manager") {
          user = await requireAdminOrManager(sessionClient);
        } else if (config.role === "authenticated") {
          user = await requireAuth(sessionClient);
        }
      } else {
        const { data } = await sessionClient.auth.getUser();
        user = data?.user || null;
      }

      const adminClient = createAdminClient();
      const ctx: ActionContext = { sessionClient, adminClient, user };

      // 3. Execute Handler
      const data = await handler(parsedInput, ctx);
      return { success: true, data };
    } catch (error: any) {
      console.error("[SafeAction] Error:", error);
      return { success: false, error: error.message || "An unexpected error occurred" };
    }
  };
}

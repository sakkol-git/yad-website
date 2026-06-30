"use server";

"use server";

import { revalidatePath } from "next/cache";
import { usersService } from "../services/users.service";
import { createSafeAction } from "@/shared/lib/safe-action";
import {
  getUsersSchema,
  createUserSchema,
  updateUserRoleSchema,
  deleteUserSchema,
} from "../validators/user.schema";

export const getUsers = createSafeAction(
  { schema: getUsersSchema, role: "admin" },
  async ({ page, limit, search }, { adminClient }) => {
    return await usersService.getAllUsersWithRoles(adminClient, page, limit, search);
  },
);

export const createUser = createSafeAction(
  { schema: createUserSchema, role: "admin" },
  async ({ email, password, role }, { adminClient }) => {
    await usersService.createUser(adminClient, email, password, role);
    revalidatePath("/admin/users");
    return true;
  },
);

export const updateUser = createSafeAction(
  { schema: updateUserRoleSchema, role: "admin" },
  async ({ userId, role }, { adminClient }) => {
    await usersService.updateUserRole(adminClient, userId, role);
    revalidatePath("/admin/users");
    return true;
  },
);

export const deleteUser = createSafeAction(
  { schema: deleteUserSchema, role: "admin" },
  async ({ userId }, { adminClient }) => {
    await usersService.deleteUser(adminClient, userId);
    revalidatePath("/admin/users");
    return true;
  },
);

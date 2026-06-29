'use server';

'use server';

import { createSafeAction } from "@/shared/lib/safe-action";
import { usersService } from "../services/users.service";
import { z } from "zod";

export const getDashboardMetrics = createSafeAction(
  { role: "admin", schema: z.any() },
  async (_, { adminClient: supabase }) => {
    const [
      { count: membersCount },
      { count: programsCount },
      { data: donations },
      { count: pendingHomestays },
    ] = await Promise.all([
      supabase.from("user_roles").select("*", { count: "exact", head: true }),
      supabase.from("programs").select("*", { count: "exact", head: true }).eq("status", "Active"),
      supabase.from("donations").select("amount, created_at").eq("status", "Completed"),
      supabase.from("bookings").select("*", { count: "exact", head: true }).in("status", ["Inquiry", "Pending Confirmation"]),
    ]);

    // calculate monthly donations
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let monthlyDonations = 0;

    if (donations) {
      donations.forEach(d => {
        const dDate = new Date(d.created_at);
        if (dDate.getMonth() === currentMonth && dDate.getFullYear() === currentYear) {
          monthlyDonations += Number(d.amount);
        }
      });
    }

    // Get recent activity
    const usersResult = await usersService.getAllUsersWithRoles(supabase);
    const recentUsers = usersResult.data.slice(0, 2);

    const { data: recentDonations } = await supabase
      .from("donations")
      .select("id, amount, method, created_at, first_name, last_name, status")
      .order("created_at", { ascending: false })
      .limit(3);

    return {
      metrics: {
        totalMembers: membersCount || 0,
        activePrograms: programsCount || 0,
        monthlyDonations,
        pendingHomestays: pendingHomestays || 0,
      },
      recentActivities: {
        users: recentUsers || [],
        donations: recentDonations || []
      }
    };
  }
);

import { AdminLayoutClient } from "@/shared/components/admin/AdminLayoutClient";
import { Metadata } from "next";
import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard | YAD",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!roleData || roleData.role === "user") {
    // Regular users trying to access admin go to portal
    redirect("/portal/dashboard");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

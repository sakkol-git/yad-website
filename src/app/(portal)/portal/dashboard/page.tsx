import { getUserDashboardSummary } from "@/server/actions/portal.actions";
import { UserDashboard } from "@/features/Static/dashboard/components/UserDashboard";

export default async function PortalDashboardPage() {
  const { user, upcomingBooking, recentDonation, recentVolunteer } =
    await getUserDashboardSummary();

  if (!user) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <UserDashboard
      user={user}
      upcomingBooking={upcomingBooking}
      recentDonation={recentDonation}
      recentVolunteer={recentVolunteer}
      greeting={getGreeting()}
    />
  );
}

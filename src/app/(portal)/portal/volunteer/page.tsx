import { getUserVolunteerEvents, signUpForEventAction } from "@/server/actions/portal.actions";
import {
  VolunteerPortal,
  PortalEvent,
  PortalEventVolunteer,
} from "@/features/Static/volunteer/components/VolunteerPortal";

export default async function PortalVolunteerPage() {
  const { upcomingEvents, myVolunteers } = await getUserVolunteerEvents();

  const signedUpEventIds =
    (myVolunteers as unknown as PortalEventVolunteer[])?.map((v) => v.event_id) || [];
  const availableEvents =
    (upcomingEvents as unknown as PortalEvent[])?.filter((e) => !signedUpEventIds.includes(e.id)) ||
    [];

  // Wrap the server action so it can accept FormData from the client form if needed,
  // or the client component can just call the action directly if we pass it down.
  // The component expects a signature: (formData: FormData) => Promise<void>
  async function handleSignUp(formData: FormData) {
    "use server";
    const eventId = formData.get("event_id") as string;
    await signUpForEventAction(eventId);
  }

  return (
    <VolunteerPortal
      myVolunteers={(myVolunteers as unknown as PortalEventVolunteer[]) || []}
      availableEvents={(availableEvents as unknown as PortalEvent[]) || []}
      signUpForEvent={handleSignUp}
    />
  );
}

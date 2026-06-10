/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { VolunteerPortal } from '@/features/Static/volunteer/components/VolunteerPortal';

export default async function PortalVolunteerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'Upcoming')
    .order('created_at', { ascending: false });

  // Fetch user's volunteer records
  const { data: myVolunteers } = await (supabase as any)
    .from('event_volunteers')
    .select('*, events(*)')
    .eq('user_id', user.id);

  // Filter out events the user is already signed up for
  const signedUpEventIds = myVolunteers?.map((v: any) => v.event_id) || [];
  const availableEvents = upcomingEvents?.filter((e: any) => !signedUpEventIds.includes(e.id)) || [];

  // Server action to sign up for an event
  async function signUpForEvent(formData: FormData) {
    'use server';
    const eventId = formData.get('event_id') as string;
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();

    if (user && eventId) {
      await (sb as any).from('event_volunteers').insert({
        user_id: user.id,
        event_id: eventId,
        status: 'Pending'
      });
      revalidatePath('/portal/volunteer');
    }
  }

  return (
    <VolunteerPortal
      myVolunteers={myVolunteers || []}
      availableEvents={availableEvents}
      signUpForEvent={signUpForEvent}
    />
  );
}

'use client';

import { useTransition } from 'react';
import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { PortalPageHeader } from '@/shared/components/portal/layout/PortalPageHeader';
import { Button } from '@/shared/components/ui/Button';
import { toast } from 'sonner';

export interface PortalEvent {
  id: string;
  name: string;
  description: string;
  venue?: string | null;
}

export interface PortalEventVolunteer {
  id: string;
  event_id: string;
  status: string;
  events?: PortalEvent | null;
}

interface VolunteerPortalProps {
  myVolunteers: PortalEventVolunteer[];
  availableEvents: PortalEvent[];
  signUpForEvent: (formData: FormData) => Promise<void>;
}

export function VolunteerPortal({
  myVolunteers,
  availableEvents,
  signUpForEvent
}: VolunteerPortalProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignUp = (eventId: string) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('event_id', eventId);
      
      try {
        await signUpForEvent(formData);
        toast.success("Successfully applied to volunteer!");
      } catch (err) {
        toast.error("Failed to sign up for event.");
      }
    });
  };

  return (
    <PortalPageLayout>
      <PortalPageHeader 
        title="Volunteer Portal" 
        description="Manage your volunteer commitments and find new opportunities to make an impact."
      />

      {/* Discovery Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-3">
          <span className="material-symbols-outlined text-primary text-[24px]">explore</span>
          Discover Opportunities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableEvents.length > 0 ? (
            availableEvents.map((event) => (
              <div key={event.id} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow flex flex-col group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-primary/10 text-primary text-xs uppercase font-bold px-2.5 py-1 rounded-md tracking-wider">Upcoming</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-on-surface mb-2 line-clamp-2">{event.name}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 flex-1">{event.description}</p>
                  
                  {event.venue && (
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium mb-6">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {event.venue}
                    </div>
                  )}
                  
                  <Button 
                    variant="default" 
                    className="w-full mt-auto min-h-[44px] shadow-sm"
                    onClick={() => handleSignUp(event.id)}
                    disabled={isPending}
                  >
                    {isPending ? 'Signing up...' : 'Sign Up to Volunteer'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-surface-container-low p-12 rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-50 mb-4">search_off</span>
              <p className="text-on-surface-variant font-medium">No new upcoming events available right now.</p>
              <p className="text-sm text-on-surface-variant mt-2">Check back later for more opportunities!</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Section */}
      <div>
        <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant/30 pb-3">
          <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
          My Commitments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myVolunteers && myVolunteers.length > 0 ? (
            myVolunteers.map((vol) => (
              <div key={vol.id} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                      ${vol.status === 'Approved' ? 'bg-secondary-container text-on-secondary-container' : 
                        vol.status === 'Pending' ? 'bg-primary-container text-on-primary-container' : 
                        vol.status === 'Completed' ? 'bg-tertiary-container text-on-tertiary-container' :
                        'bg-error-container text-error'}`}
                    >
                      {vol.status}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-on-surface mb-2">{vol.events?.name}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{vol.events?.description}</p>
                  
                  {vol.events?.venue && (
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {vol.events.venue}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-surface-container-low p-12 rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-50 mb-4">volunteer_activism</span>
              <p className="text-on-surface-variant font-medium">You haven't signed up for any events yet.</p>
              <p className="text-sm text-on-surface-variant mt-2">Explore the opportunities above to get involved!</p>
            </div>
          )}
        </div>
      </div>
    </PortalPageLayout>
  );
}

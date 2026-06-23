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
        toast.success("Application Received. Thank you.");
      } catch (err) {
        toast.error("Failed to register interest. Please try again.");
      }
    });
  };

  return (
    <PortalPageLayout>
      <PortalPageHeader 
        title="Field Deployment" 
        description="Review active volunteer commitments and explore upcoming tactical field operations."
      />

      {/* Discovery Section */}
      <div className="mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4 tracking-tight">
          Active Opportunities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableEvents.length > 0 ? (
            availableEvents.map((event) => (
              <div key={event.id} className="group relative bg-surface rounded-md p-8 border border-outline-variant/30 flex flex-col h-full hover:border-primary/40 hover:shadow-ambient transition-all duration-300">
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-secondary font-label-bold text-xs uppercase tracking-widest">Open Deployment</span>
                  </div>
                  <h3 className="font-headline-sm text-xl text-on-surface mb-3 tracking-wide">{event.name}</h3>
                  <p className="font-body-md text-on-surface-variant mb-8 line-clamp-3 flex-1 leading-relaxed">{event.description}</p>
                  
                  {event.venue && (
                    <div className="flex items-center gap-3 text-xs font-label-bold text-on-surface-variant uppercase tracking-widest mb-8">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {event.venue}
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full uppercase tracking-widest text-xs"
                    onClick={() => handleSignUp(event.id)}
                    disabled={isPending}
                  >
                    {isPending ? 'Registering...' : 'Register Interest'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 rounded-md bg-surface-container border border-outline-variant/30 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant/30 mb-4">search_off</span>
              <p className="font-headline-sm text-on-surface-variant">No active deployments.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Section */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-b border-outline-variant/30 pb-4 tracking-tight">
          My Active Deployments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myVolunteers && myVolunteers.length > 0 ? (
            myVolunteers.map((vol) => (
              <div key={vol.id} className="bg-surface-container-low rounded-md p-8 border border-outline-variant/30 flex flex-col transition-colors duration-300">
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`inline-flex items-center text-xs font-label-bold uppercase tracking-widest
                      ${vol.status === 'Approved' ? 'text-primary' : 
                        vol.status === 'Pending' ? 'text-secondary' : 
                        vol.status === 'Completed' ? 'text-tertiary' :
                        'text-error'}`}
                    >
                      Status: {vol.status}
                    </span>
                  </div>
                  
                  <h3 className="font-headline-sm text-xl text-on-surface mb-3 tracking-wide">{vol.events?.name}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">{vol.events?.description}</p>
                  
                  {vol.events?.venue && (
                    <div className="flex items-center gap-3 text-xs font-label-bold text-on-surface-variant uppercase tracking-widest">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {vol.events.venue}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 rounded-md bg-surface-container border border-outline-variant/30 text-center flex flex-col items-center justify-center">
              <p className="font-headline-sm text-on-surface-variant">You have no active deployment records.</p>
            </div>
          )}
        </div>
      </div>
    </PortalPageLayout>
  );
}

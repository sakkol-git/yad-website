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
  return (
    <div className="space-y-8">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-2xl font-bold text-on-surface">Volunteer Portal</h1>
        <p className="text-on-surface-variant text-sm mt-1">Manage your volunteer commitments and find new opportunities.</p>
      </div>

      {/* My Commitments */}
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">verified</span>
          My Commitments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myVolunteers && myVolunteers.length > 0 ? (
            myVolunteers.map((vol) => (
              <div key={vol.id} className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-on-surface">{vol.events?.name}</h3>
                  <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{vol.events?.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${vol.status === 'Approved' ? 'bg-secondary/10 text-secondary' : 
                        vol.status === 'Pending' ? 'bg-primary/10 text-primary' : 
                        vol.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' :
                        'bg-error/10 text-error'}`}
                    >
                      {vol.status}
                    </span>
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {vol.events?.venue}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant col-span-2">You haven't signed up for any events yet.</p>
          )}
        </div>
      </div>

      {/* Available Opportunities */}
      <div className="pt-4">
        <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">search</span>
          Available Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableEvents.length > 0 ? (
            availableEvents.map((event) => (
              <div key={event.id} className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-on-surface">{event.name}</h3>
                    <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded">Upcoming</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{event.description}</p>
                </div>
                
                <form action={signUpForEvent}>
                  <input type="hidden" name="event_id" value={event.id} />
                  <button type="submit" className="w-full py-2 bg-surface text-secondary border border-secondary/30 rounded-lg font-bold text-sm hover:bg-secondary hover:text-on-secondary transition-colors">
                    Sign Up to Volunteer
                  </button>
                </form>
              </div>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant col-span-2">No new upcoming events available for volunteering.</p>
          )}
        </div>
      </div>
    </div>
  );
}

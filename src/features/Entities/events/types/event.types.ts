export type EventStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  status: EventStatus;
  joinUrl?: string;
  donationUrl?: string;
  actionLabel?: string;
  actionIcon?: string;
  capacity?: string;
}

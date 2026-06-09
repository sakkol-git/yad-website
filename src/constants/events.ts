import { EventItem } from "@/types/event.types";

export const EVENTS: EventItem[] = [
  {
    id: "youth-green-canopy-initiative",
    title: "Youth Green Canopy Initiative",
    date: "Oct 15, 2024",
    location: "Siem Reap Province",
    description:
      "A massive reforestation drive aiming to plant 5,000 indigenous trees in degraded areas. Join hundreds of youth volunteers in restoring local ecosystems and learning about sustainable land management practices.",
    imageUrl:
      "/assets/images/yad-2.png",
    imageAlt: "Environmental clean-up event with volunteers planting trees",
    status: "Upcoming",
    actionLabel: "Register Now",
    actionIcon: "arrow_forward",
    capacity: "+50",
    joinUrl: "https://forms.google.com",
    donationUrl: "/donate",
  },
  {
    id: "tech-for-tomorrow",
    title: "Tech for Tomorrow Workshop",
    date: "Nov 02, 2024",
    location: "Phnom Penh",
    description:
      "Empowering rural youth with essential digital skills for the modern economy. A hands-on weekend bootcamp covering basic coding and digital literacy.",
    imageUrl:
      "/assets/images/yad-4.png",
    imageAlt: "Workshop on digital literacy for youth",
    status: "Upcoming",
    actionLabel: "Learn More",
    actionIcon: "arrow_forward",
    joinUrl: "https://forms.google.com",
    donationUrl: "/donate",
  },
  {
    id: "clean-water-access",
    title: "Clean Water Access Drive",
    date: "Aug 12, 2024",
    location: "Battambang",
    description:
      "Successfully distributed 500 water filtration systems to rural households, significantly improving community health outcomes.",
    imageUrl:
      "/assets/images/yad-5.png",
    imageAlt: "Community health awareness campaign",
    status: "Past Event",
    actionLabel: "Read Impact Report",
    actionIcon: "description",
    joinUrl: "https://forms.google.com",
    donationUrl: "/donate",
  },
  {
    id: "future-leaders-summit",
    title: "Future Leaders Summit",
    date: "Dec 05, 2024",
    location: "Kampot",
    description:
      "A gathering of young changemakers from across the nation to discuss sustainable development goals and actionable local solutions.",
    imageUrl:
      "/assets/images/yad-6.png",
    imageAlt: "Youth leadership summit discussion panel",
    status: "Upcoming",
    actionLabel: "Get Tickets",
    actionIcon: "arrow_forward",
    joinUrl: "https://forms.google.com",
    donationUrl: "/donate",
  },
];

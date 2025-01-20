import type { Announcement } from "./announcement.type"

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Product Launch",
    description: "We're excited to announce the launch of our new product line, coming next month!",
    date: "2023-07-01",
    category: "Product",
  },
  {
    id: "2",
    title: "Company Milestone",
    description: "We've reached 1 million happy customers! Thank you for your continued support.",
    date: "2023-06-15",
    category: "Company",
  },
  {
    id: "3",
    title: "Upcoming Webinar",
    description: 'Join us for a free webinar on "Future of Tech" with industry experts.',
    date: "2023-07-10",
    category: "Event",
  },
  {
    id: "4",
    title: "Holiday Schedule",
    description:
      "Our offices will be closed on July 4th for Independence Day. We'll resume normal operations on July 5th.",
    date: "2023-06-28",
    category: "Company",
  },
  {
    id: "5",
    title: "System Maintenance",
    description: "Our website will undergo scheduled maintenance on July 15th from 2 AM to 4 AM EST.",
    date: "2023-07-12",
    category: "Technical",
  },
]


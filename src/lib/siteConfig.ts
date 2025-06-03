export const meta = {
  title: "Garden Church",
  description: "Here as in Heaven",
  url: "https://garden.church",
};

export const social = {
  instagram: "https://www.instagram.com/garden.church/",
  youtube: "https://www.youtube.com/@GardenChurch/",
};

export const contact = {
  email: "info@garden.church",
  phone: "562-810-8525",
  address:
    "16450 E. Pacific Coast Highway, Suite 100, Huntington Beach, CA 92649",
  mailingAddress: "PO BOX 41517 Long Beach, CA 90853",
};

export const services = {
  sundays: {
    title: "Sundays",
    times: ["8AM", "10AM", "12PM", "6PM"],
  },
  prayerRooms: {
    title: "Prayer Rooms",
    times: ["TUE 7PM", "WED 7:30AM", "THU 9AM"],
  },
};

export const mainNav = [
  { label: "Home", path: "/" },
  { label: "Sundays", path: "/sundays" },
  {
    label: "Ministries",
    ministries: [
      { label: "Youth", path: "/ministries/youth" },
      { label: "Kids", path: "/ministries/kids" },
      { label: "House Church", path: "/ministries/house-church" },
      { label: "Prayer", path: "/ministries/prayer" },
      { label: "Global Outreach", path: "/ministries/global" },
      { label: "Local Outreach", path: "/ministries/local" },
      { label: "All Ministries", path: "/ministries" },
    ],
  },
  {
    label: "Events",
    path: "https://gardenchurch.churchcenter.com/registrations",
  },
  { label: "Serve", path: "/serve" },
  { label: "Give", path: "/give" },
];

export const footerNav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

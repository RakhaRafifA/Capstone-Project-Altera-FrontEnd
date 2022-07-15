const MEMBERSHIP = {
  id: 1,
  name: "Membership",
  link: "/membership",
};

const CLASS = {
  id: 4,
  name: "Class",
  link: "/class",
};

const BOOKING = {
  id: 5,
  name: "Booking",
  link: "/booking",
};

const USER = {
  id: 10,
  name: "User",
  link: "/user",
};

const ADMIN = {
  id: 15,
  name: "Manage Admin",
  link: "/admin",
};
const DASHBOARD = {
  id: 18,
  name: "Dashboard",
  link: "/dashboard",
};
const NEWSLETTER = {
  id: 19,
  name: "Newsletter",
  link: "/newsletter",
};
const CONTENT = {
  id: 20,
  name: "Content",
  link: "/content",
};

export const CRUMBS_DATA = {
  membership: MEMBERSHIP,
  "membership/details-membership": [
    MEMBERSHIP,
    {
      id: 2,
      name: "Details Membership",
      link: "/details-membership",
    },
  ],
  "membership/add-membership": [
    MEMBERSHIP,
    {
      id: 3,
      name: "Add Membership",
      link: "/add-membership",
    },
  ],
  class: CLASS,
  "class/add-class": [
    CLASS,
    {
      id: 6,
      name: "Add Class",
      link: "/add-class",
    },
  ],
  "class/details-class": [
    CLASS,
    {
      id: 7,
      name: "Details Class",
      link: "/details-class",
    },
  ],
  booking: BOOKING,
  "booking/add-booking": [
    BOOKING,
    {
      id: 8,
      name: "Add Booking",
      link: "/add-booking",
    },
  ],
  "booking/details-booking": [
    BOOKING,
    {
      id: 9,
      name: "Details Booking",
      link: "/details-booking",
    },
  ],
  user: USER,
  "user/add-user": [
    USER,
    {
      id: 11,
      name: "Add User",
      link: "/add-user",
    },
  ],
  "user/details-user": [
    USER,
    {
      id: 12,
      name: "Details User",
      link: "/details-user",
    },
  ],
  admin: ADMIN,
  "admin/add-admin": [
    ADMIN,
    {
      id: 13,
      name: "Add Admin",
      link: "/add-admin",
    },
  ],
  "admin/details-admin": [
    ADMIN,
    {
      id: 14,
      name: "Details Admin",
      link: "/details-admin",
    },
  ],
  dashboard: DASHBOARD,
  newsletter: NEWSLETTER,
  content: CONTENT,
};

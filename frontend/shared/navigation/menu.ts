import { USER_ROLES } from "@/shared";

export const MENUS = {
  [USER_ROLES.SUPER_ADMIN]: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Users",
      href: "/dashboard/users",
    },
    {
      title: "Courses",
      href: "/dashboard/courses",
    },
  ],

  [USER_ROLES.LECTURER]: [
    {
      title: "Dashboard",
      href: "/lecturer",
    },
    {
      title: "Calendar",
      href: "/lecturer/calendar",
    },
  ],

  [USER_ROLES.STUDENT]: [
    {
      title: "Dashboard",
      href: "/student",
    },
    {
      title: "Enrollment",
      href: "/student/enrollment",
    },
    {
      title: "Calendar",
      href: "/student/calendar",
    },
  ],
} as const;

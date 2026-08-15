import {
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  FlaskConical,
  GraduationCap,
  LayoutList,
  PlayCircle,
} from "lucide-react";

import type { TabItem } from "@/shared/components/navigation/tabs/tabs.types";

import type { CourseTab } from "./types";

export const COURSE_TABS = [
  {
    key: "site",
    label: "Site",
    icon: <BookOpen size={17} strokeWidth={1.8} />,
  },
  {
    key: "participants",
    label: "Participants",
    icon: <Users size={17} strokeWidth={1.8} />,
  },

  {
    key: "attendance",
    label: "Attendance",
    icon: <ClipboardList size={17} strokeWidth={1.8} />,
  },
] satisfies readonly TabItem<CourseTab>[];

export const SITE_SECTIONS = [
  {
    title: "Subject Outline",
    description: "Course overview, learning outcomes, weekly topics, assessment structure and subject requirements.",
    icon: LayoutList,
  },
  {
    title: "Resources",
    description: "Reference material, recommended readings, external resources and supporting documents.",
    icon: FileText,
  },
  {
    title: "Lecture Notes",
    description: "Lecture slides, notes and other materials provided throughout the course.",
    icon: BookOpen,
  },
  {
    title: "Live Streaming & Recordings",
    description: "Access live lectures and recordings of previous sessions.",
    icon: PlayCircle,
  },
  {
    title: "Lab",
    description: "Laboratory activities, practical exercises and supporting instructions.",
    icon: FlaskConical,
  },
  {
    title: "Assignments",
    description: "Course assignments, submission instructions and assessment information.",
    icon: ClipboardList,
  },
  {
    title: "Exam",
    description: "Exam information, preparation material and examination requirements.",
    icon: FileText,
  },
  {
    title: "Project",
    description: "Project requirements, milestones, submission details and supporting resources.",
    icon: GraduationCap,
  },
];

import type { SessionForm } from "./types";

export const CLASS_TYPE_OPTIONS = [
  {
    value: "lecture",
    label: "Lecture",
  },
  {
    value: "laboratory",
    label: "Laboratory",
  },
  {
    value: "tutorial",
    label: "Tutorial",
  },
  {
    value: "workshop",
    label: "Workshop",
  },
  {
    value: "seminar",
    label: "Seminar",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const INITIAL_SESSION_FORM: SessionForm = {
  title: "",
  startTime: "10:00",
  endTime: "11:00",
  weekNumber: 1,
  classType: "tutorial",
};

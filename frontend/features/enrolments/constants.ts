import { ParticipantQuery } from "./types";

export const COURSE_SEARCH_LIMIT = 10;
export const COURSE_SEARCH_MIN_LENGTH = 2;

export const INITIAL_QUERY: ParticipantQuery = {
  limit: 10,
  search: "",
  page: 1,
};

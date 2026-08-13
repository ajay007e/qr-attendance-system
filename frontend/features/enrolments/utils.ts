import { COURSE_CARD_GRADIENTS } from "./constants";

export function getCourseCardGradient(courseCode: string) {
  let hash = 0;

  for (let index = 0; index < courseCode.length; index++) {
    hash = (hash << 5) - hash + courseCode.charCodeAt(index);
    hash |= 0;
  }

  return COURSE_CARD_GRADIENTS[Math.abs(hash) % COURSE_CARD_GRADIENTS.length];
}

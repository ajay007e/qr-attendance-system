import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GRADIENTS } from "../constants/gradients";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGradient(courseCode: string) {
  let hash = 0;

  for (let index = 0; index < courseCode.length; index++) {
    hash = (hash << 5) - hash + courseCode.charCodeAt(index);
    hash |= 0;
  }

  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

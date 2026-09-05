import { OfferingRepository } from "./offering.repository";
import { isEnrolled } from "../enrolments";

export const offeringRepository = new OfferingRepository();

export { OfferingRepository, isEnrolled };

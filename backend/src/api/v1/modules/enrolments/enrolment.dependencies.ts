import { EnrolmentRepository } from "./enrolment.repository";

export const enrolmentRepository = new EnrolmentRepository();
export const isEnrolled = (...args: Parameters<EnrolmentRepository["isEnrolled"]>) =>
  enrolmentRepository.isEnrolled(...args);
export { EnrolmentRepository };

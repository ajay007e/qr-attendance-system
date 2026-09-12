import type { Role } from "@/types";
import { AppError, ROLES } from "@/utils";

import { offeringRepository, isEnrolled } from "./offering.dependencies";

export async function validateOfferingAccess(offeringId: number, userId: number, userRole: Role): Promise<void> {
  const offering = await offeringRepository.findById(offeringId);

  if (!offering) {
    throw new AppError("Course offering not found", 404);
  }

  if (userRole === ROLES.LECTURER) {
    const assigned = await offeringRepository.isLecturerAssigned(offeringId, userId);

    if (!assigned) {
      throw new AppError("You do not have access to this course offering", 403);
    }

    return;
  }

  if (userRole === ROLES.STUDENT) {
    const enrolled = await isEnrolled(offeringId, userId);

    if (!enrolled) {
      throw new AppError("You do not have access to this course offering", 403);
    }
  }
}

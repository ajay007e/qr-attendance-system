import { repository as userRepository } from "../users";
import { CourseRepository } from "../courses";

import { OfferingController } from "./offering.controller";
import { OfferingRepository } from "./offering.repository";
import { OfferingService } from "./offering.service";

const repository = new OfferingRepository();
const courseRepository = new CourseRepository();

const service = new OfferingService(repository, courseRepository, userRepository);

const controller = new OfferingController(service);

export { OfferingRepository, repository, service, controller };

export {
  CourseOffering,
  CourseOfferingListItem,
  CourseOfferingStatus,
  CourseSession,
  CourseLecturerRole,
  Lecturer,
  DatabaseCourseOffering,
  DatabaseCourseOfferingListItem,
  DatabaseLecturer,
} from "./offering.types";

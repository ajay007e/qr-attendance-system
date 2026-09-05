import { repository as userRepository } from "../users";
import { CourseRepository } from "../courses";

import { OfferingController } from "./offering.controller";
import { OfferingRepository } from "./offering.repository";
import { OfferingService } from "./offering.service";

const repository = new OfferingRepository();
const courseRepository = new CourseRepository();

const service = new OfferingService(repository, courseRepository, userRepository);

const controller = new OfferingController(service);

const isAssigned = repository.isLecturerAssigned.bind(repository);

export { OfferingRepository, repository, service, controller, isAssigned };

export { validateOfferingAccess } from "./offering.utils";

export { CourseLecturerRole, CourseOfferingStatus, CourseSession } from "./offering.types";

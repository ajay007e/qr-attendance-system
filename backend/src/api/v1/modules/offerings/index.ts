import { repository as userRepository } from "../users";
import { CourseRepository } from "../courses";

import { OfferingController } from "./offering.controller";
import { OfferingService } from "./offering.service";
import { offeringRepository, OfferingRepository } from "./offering.dependencies";

const repository = offeringRepository;
const courseRepository = new CourseRepository();

const service = new OfferingService(repository, courseRepository, userRepository);

const controller = new OfferingController(service);

export { OfferingRepository, repository, service, controller };

export { validateOfferingAccess } from "./offering.access";

export { CourseLecturerRole, CourseOfferingStatus, CourseSession } from "./offering.types";

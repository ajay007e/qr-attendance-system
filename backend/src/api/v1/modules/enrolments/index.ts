import { repository as courseRepository } from "../courses";

import { EnrolmentRepository } from "./enrolment.repository";
import { EnrolmentService } from "./enrolment.service";
import { EnrolmentController } from "./enrolment.controller";

const repository = new EnrolmentRepository();

const service = new EnrolmentService(repository, courseRepository);

const controller = new EnrolmentController(service);

export { repository, service, controller };

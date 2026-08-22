import { EnrolmentRepository } from "./enrolment.repository";
import { EnrolmentService } from "./enrolment.service";
import { EnrolmentController } from "./enrolment.controller";

import { repository as offeringRepository } from "../offerings";

const repository = new EnrolmentRepository();

const service = new EnrolmentService(repository, offeringRepository);

const controller = new EnrolmentController(service);

export { repository, service, controller };

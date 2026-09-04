import { OfferingRepository } from "../offerings/offering.repository";

import { EnrolmentRepository } from "./enrolment.repository";
import { EnrolmentService } from "./enrolment.service";
import { EnrolmentController } from "./enrolment.controller";

const repository = new EnrolmentRepository();
const offeringRepository = new OfferingRepository();

const service = new EnrolmentService(repository, offeringRepository);

const controller = new EnrolmentController(service);

export { EnrolmentRepository, repository, service, controller };

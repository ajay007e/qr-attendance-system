import { OfferingRepository } from "../offerings/offering.repository";

import { EnrolmentService } from "./enrolment.service";
import { EnrolmentController } from "./enrolment.controller";
import { isEnrolled, enrolmentRepository, EnrolmentRepository } from "./enrolment.dependencies";

const repository = enrolmentRepository;
const offeringRepository = new OfferingRepository();

const service = new EnrolmentService(repository, offeringRepository);

const controller = new EnrolmentController(service);

export { EnrolmentRepository, repository, service, controller, isEnrolled };

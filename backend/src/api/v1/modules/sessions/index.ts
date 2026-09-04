import { AttendanceSessionRepository } from "./session.repository";
import { AttendanceSessionService } from "./session.service";
import { AttendanceSessionController } from "./session.controller";
import { OfferingRepository } from "../offerings";

const repository = new AttendanceSessionRepository();
const offeringRepository = new OfferingRepository();

const service = new AttendanceSessionService(repository, offeringRepository);

const controller = new AttendanceSessionController(service);

export { repository, service, controller };

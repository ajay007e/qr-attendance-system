import { AttendanceSessionRepository } from "./session.repository";
import { AttendanceSessionService } from "./session.service";
import { AttendanceSessionController } from "./session.controller";

const repository = new AttendanceSessionRepository();

const service = new AttendanceSessionService(repository);

const controller = new AttendanceSessionController(service);

export { repository, service, controller };

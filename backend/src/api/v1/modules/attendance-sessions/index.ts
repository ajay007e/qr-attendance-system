import { repository as courseRepository } from "../courses";

import { AttendanceSessionRepository } from "./attendance-session.repository";
import { AttendanceSessionService } from "./attendance-session.service";
import { AttendanceSessionController } from "./attendance-session.controller";

const repository = new AttendanceSessionRepository();

const service = new AttendanceSessionService(repository, courseRepository);

const controller = new AttendanceSessionController(service);

export { repository, service, controller };
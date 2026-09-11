import { AttendanceRepository } from "./attendance.repository";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { repository as sessionRepository } from "../sessions";
import { websocket } from "../web-socket";

const repository = new AttendanceRepository();

const service = new AttendanceService(repository, sessionRepository, websocket);

const controller = new AttendanceController(service);

export { repository, service, controller };

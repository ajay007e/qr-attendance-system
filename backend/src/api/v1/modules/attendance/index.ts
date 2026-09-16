import { AttendanceRepository } from "./attendance.repository";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { repository as sessionRepository } from "../sessions";
import { websocket } from "../web-socket";
import { service as notificationService } from "../notifications";

const repository = new AttendanceRepository();

const service = new AttendanceService(repository, sessionRepository, websocket, notificationService);

const controller = new AttendanceController(service);

export { repository, service, controller };

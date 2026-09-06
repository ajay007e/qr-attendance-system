import { AttendanceRepository } from "./attendance.repository";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { repository as sessionRepository } from "../sessions";

const repository = new AttendanceRepository();

const service = new AttendanceService(repository, sessionRepository);

const controller = new AttendanceController(service);

export { repository, service, controller };

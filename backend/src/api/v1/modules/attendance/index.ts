import { AttendanceRepository } from "./attendance.repository";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { repository as sessionRepository } from "../sessions";
import { repository as enrolmentRepository } from "../enrolments";

const repository = new AttendanceRepository();

const service = new AttendanceService(repository, sessionRepository, enrolmentRepository);

const controller = new AttendanceController(service);

export { repository, service, controller };

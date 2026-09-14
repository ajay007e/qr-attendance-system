import { AttendanceSummaryRepository } from "./summary.repository";
import { AttendanceSummaryService } from "./summary.service";
import { AttendanceSummaryController } from "./summary.controller";

const repository = new AttendanceSummaryRepository();

const service = new AttendanceSummaryService(repository);

const controller = new AttendanceSummaryController(service);

export { repository, service, controller };
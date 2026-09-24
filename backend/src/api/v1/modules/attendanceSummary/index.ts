import { AttendanceSummaryRepository } from "./attendanceSummary.repository";
import { AttendanceSummaryService } from "./attendanceSummary.service";
import { AttendanceSummaryController } from "./attendanceSummary.controller";

const repository = new AttendanceSummaryRepository();

const service = new AttendanceSummaryService(repository);

const controller = new AttendanceSummaryController(service);

export { repository, service, controller };
import { NotificationController } from "./notification.controller";
import { NotificationRepository } from "./notification.repository";
import { NotificationService } from "./notification.service";

const repository = new NotificationRepository();

const service = new NotificationService(repository);

const controller = new NotificationController(service);

export { NotificationRepository, NotificationService };
export { repository, service, controller };

export { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES, NOTIFICATION_REFERENCE_TYPES } from "./notification.constants";

export type { Notification, NotificationCreateData, NotificationQuery } from "./notification.types";


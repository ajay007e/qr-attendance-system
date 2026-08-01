import { repository as userRepository } from "../users";

import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

const repository = new CourseRepository();

const service = new CourseService(repository, userRepository);

const controller = new CourseController(service);

export { repository, service, controller };

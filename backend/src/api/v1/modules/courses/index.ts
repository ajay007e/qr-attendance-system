import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

const repository = new CourseRepository();

const service = new CourseService(repository);

const controller = new CourseController(service);

export { CourseRepository };
export { repository, service, controller };

export { Course, DatabaseCourse } from "./course.types";

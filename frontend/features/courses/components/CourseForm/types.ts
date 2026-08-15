import type { CreateCourseRequest } from "../../types";

export interface CourseFormProps {
  onSubmit: (data: CreateCourseRequest) => Promise<void> | void;
}

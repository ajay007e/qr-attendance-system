import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

export { repository, service, controller };

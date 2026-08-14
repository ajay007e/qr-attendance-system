import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

export { UserRepository };
export { repository, service, controller };

export { toCreateUserData, toUser } from "./user.mapper";
export { DatabaseUser, PublicUser } from "./user.types";

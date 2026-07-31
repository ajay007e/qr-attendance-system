import { AuthController } from "./auth.controller";
import { UserRepository } from "../users/user.repository";
import { AuthService } from "./auth.service";

const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

export { controller };

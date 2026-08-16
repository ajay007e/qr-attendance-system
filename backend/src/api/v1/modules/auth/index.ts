import { AuthController } from "./auth.controller";
import { repository as userRepository } from "../users";
import { AuthService } from "./auth.service";

const service = new AuthService(userRepository);
const controller = new AuthController(service);

export { controller };

import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

export { controller };

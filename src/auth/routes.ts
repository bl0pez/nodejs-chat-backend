import { Router } from "express";
import { AuthService } from "./service";
import { AuthController } from "./controllers";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();

    const controller = new AuthController(authService);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/renewToken", controller.renewToken);

    return router;
  }
}

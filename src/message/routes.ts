import { Router } from "express";
import { MessageService } from "./service";
import { MessageControllers } from "./controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class MessageRoutes {
  static get routes(): Router {
    const router = Router();
    const authService = new MessageService();

    const controller = new MessageControllers(authService);

    router.get('/:from', [AuthMiddleware.validateJWT],controller.findMessages);

    
    return router;
  }
}

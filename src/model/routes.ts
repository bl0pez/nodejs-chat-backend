import { Router } from "express";
import { AuthRoutes } from "../auth/routes";
import { MessageRoutes } from "../message/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes)
        router.use("/api/message", MessageRoutes.routes);

        return router;
    }
}
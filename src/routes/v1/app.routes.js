import { Router } from 'express';
import {UploadRouter} from "../../uploads/routes/upload.routes.js";
import {AuthRoutes} from "../../auth/routes/auth.routes.js";

export class AppRouter {
  static get routes() {
    const appRouter = Router();

    appRouter.use('/login', AuthRoutes.routes);
    appRouter.use('/upload', UploadRouter.routes);

    return appRouter;
  }
}
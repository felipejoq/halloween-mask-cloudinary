import { Router } from 'express';
import {UploadRouter} from "../../uploads/routes/upload.routes.js";
import {AuthRoutes} from "../../auth/routes/auth.routes.js";
import {PostImagesRoutes} from "../../posts/routes/post.images.routes.js";

export class AppRouter {
  static get routes() {
    const appRouter = Router();

    appRouter.use('/login', AuthRoutes.routes);
    appRouter.use('/upload', UploadRouter.routes);
    appRouter.use('/post-images', PostImagesRoutes.routes);

    return appRouter;
  }
}
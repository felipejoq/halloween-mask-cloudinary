import {Router} from 'express';
import {AuthService} from "../services/auth.service.js";
import {AuthController} from "../controllers/auth.controller.js";

export class AuthRoutes {

  static get routes() {
    const authService = new AuthService();
    const authController = new AuthController(authService);

    const authRouter = Router();

    authRouter.post('/', authController.login.bind(authController));

    return authRouter;

  }

}
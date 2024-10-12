import {handleError} from "../../config/errors/handler.error.js";
import {CustomError} from "../../config/errors/custom.error.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login(req, res) {
    const {user, pass} = req.body;
    if(!user || !pass) {
      return handleError(CustomError.badRequest('User and password are required'), res);
    }

    this.authService.login({user, pass})
      .then(data => res.json(data))
      .catch(err => handleError(err, res));

  }
}
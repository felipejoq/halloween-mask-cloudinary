import {JwtPlugin} from "../config/plugins/jwt.plugin.js";
import {envsPlugin} from "../config/plugins/envs.plugin.js";

export class AuthMiddleware {

  constructor() {
  }

  static async validateJWT(req, res, next) {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({error: 'No token provided'});
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Bearer token'});

    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await JwtPlugin.validateToken({token});
      if (!payload) return res.status(401).json({error: 'El token no es válido'})

      req.body.user = envsPlugin.USER_GET_TOKEN;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'Internal server error'});
    }

  }

}
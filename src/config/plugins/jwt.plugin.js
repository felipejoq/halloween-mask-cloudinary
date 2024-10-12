import jwt from 'jsonwebtoken';
import {envsPlugin} from './envs.plugin.js';

const JWT_SEED = envsPlugin.JWT_SEED;
const JWT_EXPIRATION = envsPlugin.JWT_EXPIRATION;

export class JwtPlugin {

  static async generateToken({payload, duration = JWT_EXPIRATION}) {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {
        if (err)
          return resolve(null);

        resolve(token);
      });
    })
  }

  static async validateToken({token}) {

    return new Promise((resolve) => {

      jwt.verify(token, JWT_SEED, (err, decoded) => {

        if (err) return resolve(null);

        resolve(decoded);
      });

    })
  }

}
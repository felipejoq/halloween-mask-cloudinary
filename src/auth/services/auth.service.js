import {envsPlugin} from "../../config/plugins/envs.plugin.js";
import {Encoder} from "../../config/plugins/encoder.plugin.js";
import {JwtPlugin} from "../../config/plugins/jwt.plugin.js";

export class AuthService {
  constructor() {}

  async login({user, pass}) {
    const userExist = envsPlugin.USER_GET_TOKEN === user;
    const passMatch = Encoder.compareHash({ str: pass, hash: envsPlugin.PASS_GET_TOKEN });

    if (!userExist || !passMatch) {
      throw new Error('Invalid password or user');
    }

    const payload = {
      user: envsPlugin.USER_GET_TOKEN,
      role: 'admin',
    };

    const token = await JwtPlugin.generateToken({ payload });
    if(!token) throw new Error('Error generating token');

    return { token };
  }

}
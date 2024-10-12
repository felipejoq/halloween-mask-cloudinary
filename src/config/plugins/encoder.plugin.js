import argon2 from 'argon2';

export class Encoder {

  static async getHash({str}){
    return argon2.hash(str);
  }

  static async compareHash({str, hash}){
    return argon2.verify(hash, str);
  }

}
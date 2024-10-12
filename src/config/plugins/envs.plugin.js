import 'dotenv/config';

import env from 'env-var';

export const envsPlugin = {
  PORT: env.get('PORT').default('3000').asPortNumber(),
  CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
  CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').required().asString(),
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),
  JWT_EXPIRATION: env.get('JWT_EXPIRATION').required().asString(),
  USER_GET_TOKEN: env.get('USER_GET_TOKEN').required().asString(),
  PASS_GET_TOKEN: env.get('PASS_GET_TOKEN').required().asString(),
}
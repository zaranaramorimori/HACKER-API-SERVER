import Joi from "joi";

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required(),

  DEV_DB_TYPE: Joi.string().required(),
  DEV_DB_PORT: Joi.number().required(),
  DEV_DB_HOST: Joi.string().required(),
  DEV_DB_USERNAME: Joi.string().required(),
  DEV_DB_PASSWORD: Joi.string().required(),
  DEV_DB_DATABASE_NAME: Joi.string().required(),
  DEV_DB_SYNC: Joi.boolean().required(),
  DEV_DB_LOGGING: Joi.boolean().required(),

  DB_CONNECTION_TIMEOUT: Joi.number().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  REDIS_TEST_HOST: Joi.string().required(),
  REDIS_TEST_PORT: Joi.number().required(),

  SWAGGER_ADMIN_USER: Joi.string().required(),
  SWAGGER_ADMIN_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.number().required(),
  JWT_REFRESH_EXPIRATION: Joi.number().required(),
});

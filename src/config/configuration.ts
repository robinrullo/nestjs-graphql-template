import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('DEVELOPMENT', 'STAGING', 'PRODUCTION')
    .default('DEVELOPMENT'),
  APP_ADDRESS: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().default('localhost'),
});

const configuration = () => ({
  environment: process.env.NODE_ENV,
  app: {
    address: process.env.APP_ADDRESS,
    port: parseInt(process.env.APP_PORT, 10),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});

export { validationSchema, configuration };

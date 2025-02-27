import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  NATS_URL: string;
  PRODUCTS_MIN_ITEMS: number;
}

const envsSchema = joi
  .object({
    NATS_URL: joi.string().required(),
    PRODUCTS_MIN_ITEMS: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  natsUrl: envVars.NATS_URL,
  productsMinItems: envVars.PRODUCTS_MIN_ITEMS,
};

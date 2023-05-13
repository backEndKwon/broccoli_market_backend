require("dotenv").config();

const env = process.env;

const development = {
  host: env.DB_HOST,
  username: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT,
};
const test = {
  host: env.DB_HOST,
  username: env.DB_USER,
  database: env.DB_TEST_NAME,
  password: env.DB_PASSWORD,
  dialect: env.DB_DIALECT,
};
const jwt = {
  secretKey: env.SECRET_KEY,
  refreshExpiresIn: env.REFRESH_EXPIRES,
  accessExpiresIn: env.ACCESS_EXPIRES,
};
const bcrypt = {
  saltRounds: parseInt(env.BCRYPT_SALT_ROUNDS),
};
const host = {
  port: parseInt(env.HOST_PORT),
};
const s3 = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

module.exports = { development, test, jwt, bcrypt, host, s3 };

const requiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing environment variable " + key);
  }
  return value;
};

export const config = {
  PORT: requiredEnv("PORT"),
  DB_HOST: requiredEnv("DB_HOST"),
  DB_USER: requiredEnv("DB_USER"),
  DB_PASSWORD: requiredEnv("DB_PASSWORD"),
  DB_DATABASE: requiredEnv("DB_DATABASE"),
  DB_DIALECT: requiredEnv("DB_DIALECT"),
  BCRYPT_SALT_ROUNDS: +requiredEnv("BCRYPT_SALT_ROUNDS"),
  JWT_SECRET: requiredEnv("JWT_SECRET"),
  JWT_EXPIRES_SECONDS: requiredEnv("JWT_EXPIRES_SECONDS"),
  DB_USE_SSL: requiredEnv("DB_USE_SSL") ?? false,
};
//con el+lo vuelve entero

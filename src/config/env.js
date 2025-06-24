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
};

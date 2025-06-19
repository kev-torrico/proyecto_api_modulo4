const requiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing environment variable " + key);
  }
  return value;
};

const config = {
  PORT: requiredEnv("PORT"),
};

export default config;

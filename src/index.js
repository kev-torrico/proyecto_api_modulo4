import app from "./app.js";
import logger from "./logs/logger.js";
import "dotenv/config";

async function main() {
  app.listen(process.env.PORT);
  logger.info("Server running on http://localhost:3001");
  logger.error("This is an error");
  logger.warn("This a warn message");
  logger.fatal("This is a fatal message");
}

main();

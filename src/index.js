import "dotenv/config";
import app from "./app.js";
import logger from "./logs/logger.js";
import { config } from "./config/env.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({ force: true });

  const port = config.PORT;
  app.listen(port);
  logger.info("Server running at port: " + port);
  logger.error("This is an error");
  logger.warn("This a warn message");
  logger.fatal("This is a fatal message");
}

main();

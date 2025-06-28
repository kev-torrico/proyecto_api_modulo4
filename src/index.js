import "dotenv/config";
import app from "./app.js";
import logger from "./logs/logger.js";
import { config } from "./config/env.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({ force: false });

  const port = config.PORT;
  app.listen(port);
  logger.info("Server running at port: " + port);
}

main();

import express from "express";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import { authenticateToken } from "./middlewares/authenticate.js";

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/login", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

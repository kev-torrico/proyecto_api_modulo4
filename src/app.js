import express from "express";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use("/api/users", userRoutes);

export default app;

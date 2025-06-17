import { Router } from "express";
import userController from "../controllers/users.controller.js";

const router = Router();

//Routes
router.get("/", userController.getUsers);

export default router;

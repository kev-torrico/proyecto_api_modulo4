import { Router } from "express";
import userController from "../controllers/users.controller.js";

const router = Router();

//Routes
router.route("/").get(userController.getUsers).post(userController.createUser);

export default router;

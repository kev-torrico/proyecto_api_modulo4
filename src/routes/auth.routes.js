import { Router } from "express";
import authControler from "../controllers/auth.controller.js";

const router = Router();

router.route("/").post(authControler.login);

export default router;

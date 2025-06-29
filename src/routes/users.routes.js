import { Router } from "express";
import userController from "../controllers/users.controller.js";
import validate from "../validators/validator.js";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "../validators/user.validate.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = Router();

//Routes
router
  .route("/")
  .get(userController.getUsers)
  .post(validate(createUserSchema, "body"), userController.createUser);
router
  .route("/:id")
  .get(authenticateToken, userController.getUser)
  .put(
    authenticateToken,
    validate(updateUserSchema, "body"),
    userController.updateUser
  )
  .delete(authenticateToken, userController.deleteUser)
  .patch(
    authenticateToken,
    validate(updateUserStatusSchema, "body"),
    userController.activateInactivate
  );

router.get("/:id/tasks", authenticateToken, userController.getTasks);

router.get("/list/pagination", userController.getPagination);

export default router;

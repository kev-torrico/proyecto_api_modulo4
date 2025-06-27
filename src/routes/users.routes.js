import { Router } from "express";
import userController from "../controllers/users.controller.js";
import validate from "../validators/validator.js";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "../validators/user.validate.js";

const router = Router();

//Routes
router
  .route("/")
  .get(userController.getUsers)
  .post(validate(createUserSchema, "body"), userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(validate(updateUserSchema, "body"), userController.updateUser)
  .delete(userController.deleteUser)
  .patch(
    validate(updateUserStatusSchema, "body"),
    userController.activateInactivate
  );

export default router;

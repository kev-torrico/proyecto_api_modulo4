import { Router } from "express";
import taskController from "../controllers/task.controller.js";

const router = Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);
router
  .route("/:id")
  .put(taskController.updateTask)
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .patch(taskController.taskDone);

export default router;

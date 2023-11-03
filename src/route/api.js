import express from "express";
import userController from "../controller/userController.js";
import projectNameController from "../controller/projectNameController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import taskController from "../controller/taskController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Project Name API
// userRouter.post("/api/users/:userId/project", projectNameController.create);
userRouter.post("/api/project", projectNameController.create);
userRouter.get("/api/project/:projectNameId", projectNameController.get);
userRouter.put("/api/project/:projectNameId", projectNameController.update);
userRouter.delete("/api/project/:projectNameId", projectNameController.remove);
userRouter.get("/api/project", projectNameController.list);
userRouter.get("/api/project", projectNameController.search);

// Task API
userRouter.post("/api/project/:projectNameId/task", taskController.create);
userRouter.get("/api/project/:projectNameId/task/:taskId", taskController.get);
userRouter.put("/api/project/:projectNameId/task/:taskId", taskController.update);
userRouter.patch("/api/project/:projectNameId/task/:taskId", taskController.update);
userRouter.delete("/api/project/:projectNameId/task/:taskId", taskController.remove);
userRouter.get("/api/project/:projectNameId/task", taskController.list);
userRouter.get("/api/task", taskController.search);

export { userRouter };

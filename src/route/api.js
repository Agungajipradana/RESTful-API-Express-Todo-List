import express from "express";
import userController from "../controller/userController.js";
import projectNameController from "../controller/projectNameController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Project Name API
userRouter.post("/api/users/:userId/project", projectNameController.create);
userRouter.get("/api/users/:userId/project/:projectNameId", projectNameController.get);
userRouter.put("/api/users/:userId/project/:projectNameId", projectNameController.update);
userRouter.delete("/api/users/:userId/project/:projectNameId", projectNameController.remove);
userRouter.get("/api/users/:userId/project", projectNameController.list);
userRouter.get("/api/project", projectNameController.search);

export { userRouter };

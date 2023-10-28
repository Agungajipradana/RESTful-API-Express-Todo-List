import express from "express";
import { publicRouter } from "../route/publicApi.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);
app.use(cors());
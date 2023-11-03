import express from "express";
import { publicRouter } from "../route/publicApi.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";
import dotenv from "dotenv";

export const app = express();
app.use(express.json());
app.use(cors());
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);
dotenv.config();

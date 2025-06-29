import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./utilities/config";
import connectToDB from "./utilities/connectToDb";
import upload from "./utilities/multer";
import cookieParser from "cookie-parser";

import unknownEndpoint from "./middlewares/unknownEndpoint";
import { errorHandler } from "./middlewares/errorHandler";

import AdminUserRouter from "./modules/adminuser/routes";
import RecruitRouter from "./modules/recruit/routes";

import { resolve } from "path";

const MONGO_URI = config.MONGO_URI;
const app = express();

connectToDB(MONGO_URI);
morgan.token("body", function (req: express.Request) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(morgan(":method :url :status :body"));
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(resolve("dist/public")));

app.use("/adminuser_api", upload.array("image"), AdminUserRouter);
app.use("/recruit_api", upload.array("image"), RecruitRouter);

try {
  app.get(/.*/, (_, res) => {
    res.sendFile(resolve("dist/public/index.html"));
  });
} catch (err) {
  console.error("app.get('*') route failed to register:", err);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

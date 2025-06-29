import express from "express";
import controller from "./controller";

const RecruitRouter = express.Router();

RecruitRouter.post("/", controller.addRecruit);
RecruitRouter.get("/", controller.getRecuitsPerPage);

export default RecruitRouter;

import express from "express";
import controller from "./controller";

const AdminUserRouter = express.Router();

AdminUserRouter.post("/", controller.addAdminUser);
AdminUserRouter.post("/login", controller.login);
AdminUserRouter.post("/logout", controller.logout);
AdminUserRouter.post("/refreshoken", controller.generateRefreshToken);

export default AdminUserRouter;

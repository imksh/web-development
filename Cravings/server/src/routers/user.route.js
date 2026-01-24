import express from "express";
import { userUpdate } from "../controllers/user.controller.js";
import protectedRoutes from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/update", protectedRoutes, userUpdate);

export default router;

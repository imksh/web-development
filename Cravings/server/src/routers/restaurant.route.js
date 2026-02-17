import express from "express";
import multer from "multer";

import {
  GetRestaurantMenuItem,
  RestaurantAddMenuItem,
  RestaurantChangePhoto,
  RestaurantEditMenuItem,
  RestaurantResetPassword,
  RestaurantUpdate,
} from "../controllers/restaurant.controller.js";
import { ManagerProtect } from "../middlewares/roleProtect.middleware.js";
import protectedRoutes from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  protectedRoutes,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);
router.get(
  "/menuItems",
  protectedRoutes,
  ManagerProtect,
  GetRestaurantMenuItem,
);

router.put(
  "/updateMenuItem/:id",
  protectedRoutes,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantEditMenuItem,
);

router.put("/update", protectedRoutes, ManagerProtect, RestaurantUpdate);
router.patch(
  "/changePhoto",
  protectedRoutes,
  ManagerProtect,
  upload.single("image"),
  RestaurantChangePhoto,
);

router.patch(
  "/resetPassword",
  protectedRoutes,
  ManagerProtect,
  RestaurantResetPassword,
);

export default router;

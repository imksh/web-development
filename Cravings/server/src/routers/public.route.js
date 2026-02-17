import express from "express";
import {
  GetAllRestaurants,
  GetRetaurantMenuData,
  newContact,
  GetMenuItem,
} from "../controllers/public.controller.js";

const router = express.Router();

router.post("/new-contact", newContact);

router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant-menu/:id", GetRetaurantMenuData);
router.get("/menu/:id", GetMenuItem);

export default router;

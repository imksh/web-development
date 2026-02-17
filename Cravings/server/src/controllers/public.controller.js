import Contact from "../models/contact.model.js";
import Menu from "../models/menu.model.js";
import User from "../models/user.model.js";

export const newContact = async (req, res, next) => {
  try {
    const { fullName, phone, message, email } = req.body;
    if (!fullName || !phone || !message || !email) {
      return next({
        status: 400,
        message: "All fields are required",
      });
    }

    const newMessage = await Contact.create({
      fullName,
      phone,
      message,
      email,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in newContact controller", error);
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    );

    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const GetRetaurantMenuData = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({
      resturantID: id,
    }).sort({ updatedAt: -1 });

    console.log(restaurantMenuData);

    res.status(200).json(restaurantMenuData);
  } catch (error) {
    next(error);
  }
};

export const GetMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        status: 400,
        message: "Id is missing",
      });
    }

    const menuItem = await Menu.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    console.log("Error in menu item: ", error);
    next(error);
  }
};

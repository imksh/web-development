import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Menu from "../models/menu.model.js";
import connectDB from "../config/db.js";

dotenv.config();

// ----------- COMMON MENU DATA -----------
const commonMenu = [
  {
    dishName: "Paneer Butter Masala",
    cuisine: "North Indian",
    servingSize: "Full",
    type: "veg",
    description: "Creamy tomato based paneer curry",
    price: "220",
    image: [
      {
        url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "paneer_butter",
      },
    ],
  },
  {
    dishName: "Chicken Biryani",
    cuisine: "Hyderabadi",
    servingSize: "Full",
    type: "non-veg",
    description: "Aromatic basmati rice with spicy chicken",
    price: "280",
    image: [
      {
        url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "chicken_biryani",
      },
    ],
  },
  {
    dishName: "Veg Hakka Noodles",
    cuisine: "Chinese",
    servingSize: "Full",
    type: "veg",
    description: "Stir fried noodles with vegetables",
    price: "180",
    image: [
      {
        url: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "veg_noodles",
      },
    ],
  },
  {
    dishName: "Margherita Pizza",
    cuisine: "Italian",
    servingSize: "Medium",
    type: "veg",
    description: "Classic cheese pizza with tomato sauce",
    price: "250",
    image: [
      {
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "pizza",
      },
    ],
  },
  {
    dishName: "Grilled Chicken",
    cuisine: "Continental",
    servingSize: "Full",
    type: "non-veg",
    description: "Juicy grilled chicken with herbs",
    price: "320",
    image: [
      {
        url: "https://images.unsplash.com/photo-1712579733874-c3a79f0f9d12?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "grilled_chicken",
      },
    ],
  },
  {
    dishName: "Masala Dosa",
    cuisine: "South Indian",
    servingSize: "Single",
    type: "veg",
    description: "Crispy dosa stuffed with potato masala",
    price: "120",
    image: [
      {
        url: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "dosa",
      },
    ],
  },
  {
    dishName: "Chole Bhature",
    cuisine: "North Indian",
    servingSize: "Full",
    type: "veg",
    description: "Spicy chickpeas with fried bread",
    price: "160",
    image: [
      {
        url: "https://images.unsplash.com/photo-1580689376629-2c4ef0920e79?q=80&w=739&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "chole_bhature",
      },
    ],
  },
  {
    dishName: "Veg Burger",
    cuisine: "Fast Food",
    servingSize: "Single",
    type: "veg",
    description: "Crispy veg patty burger",
    price: "110",
    image: [
      {
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "burger",
      },
    ],
  },
  {
    dishName: "Egg Curry",
    cuisine: "Indian",
    servingSize: "Full",
    type: "egg",
    description: "Boiled eggs in spicy gravy",
    price: "190",
    image: [
      {
        url: "https://images.unsplash.com/photo-1764315197254-94385571df22?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "egg_curry",
      },
    ],
  },
  {
    dishName: "Chocolate Brownie",
    cuisine: "Dessert",
    servingSize: "Single",
    type: "veg",
    description: "Rich chocolate brownie with nuts",
    price: "140",
    image: [
      {
        url: "https://images.unsplash.com/photo-1461009312844-e80697a81cc7?q=80&w=1388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        publicID: "brownie",
      },
    ],
  },
];

// ----------- SEED FUNCTION -----------
const seedMenu = async () => {
  try {
    connectDB();
    const restaurants = await User.find({ role: "manager" });

    if (restaurants.length === 0) {
      console.log("No restaurants found");
      process.exit();
    }

    // Optional: Clear existing menu
    await Menu.deleteMany();
    console.log("Old menu cleared");

    for (const restaurant of restaurants) {
      const menuWithRestaurantID = commonMenu.map((item) => ({
        ...item,
        resturantID: restaurant._id,
        status: "available",
      }));

      await Menu.insertMany(menuWithRestaurantID);
    }

    console.log("Menu seeded successfully for all restaurants");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedMenu();

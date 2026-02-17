//package import
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import cloudinary from "./src/config/cloudinary.js";
import authRouter from "./src/routers/auth.route.js";
import publicRouter from "./src/routers/public.route.js";
import userRouter from "./src/routers/user.route.js";
import restaurantRouter from "./src/routers/restaurant.route.js"

const app = express();

//middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.53.203.71:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routers

app.use("/public", publicRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/user", restaurantRouter);

//home route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

//not found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

//error middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

//port
const port = process.env.PORT || 4500;

app.listen(port, async () => {
  console.log("Server is started at: ", port);
  connectDB();
  // try {
  //   const res = await cloudinary.api.ping();
  //   console.log("Cloudinary api is working ", res);
  // } catch (error) {
  //   console.error("Error in connecting cloudinary api", error);
  // }
});

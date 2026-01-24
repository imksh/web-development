import User from "../models/user.model.js";

export const userUpdate = async (req, res, next) => {
  try {
    const { email, phone, name } = req.body;

    console.log({ email, phone, name });

    if (!email || !name || !phone) {
      return next({
        status: 400,
        message: "All fileds are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { email, phone, name } },
      { new: true },
    );

    console.log(user);

    res.status(200).json({ data: user, message: "Updated successfully" });
  } catch (error) {
    console.log("Error in update profile: ", error);
  }
};

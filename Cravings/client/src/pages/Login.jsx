import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import api from "../config/Api";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      console.log(data);

      const res = await api.post("/auth/login", data);

      console.log("Message: ", res.data.message);
      console.log("Data: ", res.data.data);
      toast.success(res.data.message);

      setIsLoading(false);
      handleReset(e);
      setShowAnimation(true);
    } catch (error) {
      console.log("Error in login: ", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData({
      email: "",
      password: "",
    });

    setShowAnimation(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center  w-full my-8 hide-scrollbar">
      <form
        className="w-[90%] md:w-[60%] px-4 py-8 md:p-16 rounded-2xl flex flex-col gap-2 shadow-2xl"
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleReset(e)}
      >
        <h2 className="text-center text-primary font-bold my-2 text-xl md:text-3xl">
          Login
        </h2>
        <div className="w-full flex flex-col gap-6 my-4">
          <div className="flex  flex-col md:flex-row justify-between w-full items-center  gap-8 px-4">
            <div className="w-full flex flex-col">
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={(e) => handleChange(e)}
                className="border p-3 rounded w-full"
                required
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 my-4">
          <div className="flex  flex-col md:flex-row justify-between w-full items-center  gap-8 px-4">
            <div className="w-full  flex flex-col">
              <div className="flex items-center relative w-full">
                <input
                  type={!showPass ? "password" : "text"}
                  name="password"
                  id="password"
                  className="border p-3 rounded w-full "
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                />
                <button
                  className="absolute right-4 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                  type="button"
                >
                  {showPass ? (
                    <IoMdEye className=" w-5 h-5" />
                  ) : (
                    <IoMdEyeOff className=" w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around w-full my-8 gap-4 md:gap-8">
          <button
            className="w-[50%] py-4 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer  mx-auto rounded-lg hover:scale-105"
            type="submit"
          >
            Submit
          </button>
          <button
            className="w-[50%] py-4 bg-red-500 hover:bg-red-700 text-white cursor-pointer  mx-auto  rounded-lg hover:scale-105"
            type="reset"
          >
            Clear
          </button>
        </div>
      </form>

      {showAnimation && (
        <>
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%]"
          />
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%]"
          />
        </>
      )}
    </div>
  );
};

export default Login;

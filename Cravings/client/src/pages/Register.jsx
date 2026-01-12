import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import api from "../config/Api";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
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
      if (!validate()) {
        setIsLoading(false);
        toast.error("Form validation failed");
        return;
      }

      const isMatched = data.password === confirm;
      if (!isMatched) {
        setIsLoading(false);
        toast.error("Password didn't matched");
      }
      console.log(data);

      const res = await api.post("/auth/register", data);

      console.log("Message: ", res.data.message);
      console.log("Data: ", res.data.data);
      toast.success(res.data.message);

      setIsLoading(false);
      handleReset(e);
      setShowAnimation(true);
    } catch (error) {
      console.log("Error in registration: ", error);
      toast.error(error.response.data.message);
    }
  };

  const validate = () => {
    const error = {};
    if (!/^[A-Za-z ]+$/.test(data.fullName)) {
      error.fullName = "Please enter a valid name";
    }
    if (!/^[\w\.]+@[A-Za-z]+\.[A-Za-z]+$/.test(data.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!/^[6-9]\d{9}$/.test(data.phone)) {
      error.number = "Enter a 10-digit Indian mobile number";
    }

    setErr(error);
    if (Object.keys(error).length > 0) {
      console.log(error);
      return false;
    }
    return true;
  };
  const handleReset = (e) => {
    e.preventDefault();
    setData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });

    setConfirm("");

    setShowAnimation(false);
    setErr({});
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center  w-full my-8 hide-scrollbar">
      <form
        className="w-[90%] md:w-[60%] px-4 py-8 md:p-16 rounded-2xl flex flex-col gap-2 shadow-2xl"
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleReset(e)}
      >
        <h2 className="text-center text-primary font-bold my-2 text-xl md:text-3xl">
          Registration
        </h2>
        <div className="w-full flex flex-col gap-6 my-4">
          <p className="font-bold md:text-xl border-b-2 border-blue-500 px-2 py-3">
            Personal Information
          </p>
          <div className="flex flex-col md:flex-row justify-between w-full items-baseline  gap-8 px-4">
            <div className="w-full flex flex-col">
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={data.fullName}
                onChange={(e) => handleChange(e)}
                className="border p-3 rounded w-full"
                required
                placeholder="Full Name"
              />
              <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.fullName}
              </span>
            </div>
          </div>
          <div className="flex  flex-col md:flex-row justify-between w-full items-center  gap-8 px-4">
            <div className="w-full md:w-[50%] flex flex-col">
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
              <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.email}
              </span>
            </div>
            <div className="w-full md:w-[50%] flex flex-col">
              <input
                type="number"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={(e) => handleChange(e)}
                className="border p-3 rounded w-full "
                required
                placeholder="Phone Number"
              />
              <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.number}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 my-4">
          <p className="font-bold md:text-xl border-b-2 border-blue-500 px-2 py-3">
            Password
          </p>

          <div className="flex  flex-col md:flex-row justify-between w-full items-center  gap-8 px-4">
            <div className="w-full md:w-[50%] flex flex-col">
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
              {/* <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.number}
              </span> */}
            </div>
            <div className="w-full md:w-[50%] flex flex-col">
              <input
                type="password"
                name="confirm"
                id="confirm"
                className={`border p-3 rounded w-full  outline-0 ${
                  confirm !== "" && confirm !== data.password
                    ? "border-red-400"
                    : ""
                }`}
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {/* <span className="text-red-500 text-[12px] ml-auto mr-2">
                {err.email}
              </span> */}
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

export default Register;

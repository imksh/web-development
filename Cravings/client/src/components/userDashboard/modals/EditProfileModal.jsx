import React, { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import Edit from "../../../assets/animations/edit.json";
import Lottie from "lottie-react";

const EditProfileModal = ({ onClose }) => {
  const { user } = useAuth();
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
  };

  return (
    <div className="bg-black/70 fixed inset-0 flex justify-center items-center z-99">
      <div className="p-8 rounded-2xl bg-gradient  h-[60%] w-[70%] overflow-y-auto relative">
        <div className="flex relative items-center justify-center w-fit  mx-auto">
          <Lottie animationData={Edit} className="w-12 absolute left-0 -translate-x-[100%] -top-5 text-(--primary)" />
          <h2 className="text-2xl font-bold text-(--primary) text-center mb-4">
            Edit Profile
          </h2>
        </div>

        <form className="w-[50%] mx-auto gap-4 flex flex-col">
          <div className="w-full flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
              className="border p-4 rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed  w-full "
              required
              disabled={isLoading}
              placeholder="Full Name"
            />
            <span className="text-red-500 text-[12px] ml-auto mr-2">
              {err.name}
            </span>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => handleChange(e)}
              className="border p-4 rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed  w-full "
              required
              disabled={true}
              placeholder="Email"
            />
            <span className="text-red-500 text-[12px] ml-auto mr-2">
              {err.name}
            </span>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange(e)}
              className="border p-4 rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed  w-full "
              required
              disabled={isLoading}
              placeholder="Phone"
            />
            <span className="text-red-500 text-[12px] ml-auto mr-2">
              {err.name}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-fit px-6 py-2 rounded-lg mx-auto bg-blue-500 text-white text-lg font-extrabold hover:bg-blue-700 cursor-pointer "
          >
            Update
          </motion.button>
        </form>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-10 aspect-square rounded-full bg-red-500 text-white text-lg font-extrabold hover:bg-red-700 cursor-pointer absolute right-5 top-5"
        >
          X
        </motion.button>
      </div>
    </div>
  );
};

export default EditProfileModal;

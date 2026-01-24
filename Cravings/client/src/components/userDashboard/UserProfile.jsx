import React, { useState } from "react";
import { motion } from "motion/react";

import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  return (
    <>
      <div className="relative min-h-full">
        <div className="flex items-center  gap-4 p-8 w-[95%] md:w-[80%] bg-black/20 my-4 rounded-2xl mx-auto">
          <div className="bg-(--accent) w-14 sm:w-16 md:w-20 aspect-square border-2 border-(--primary) rounded-full text-center text-white justify-center items-center flex  text-xl md:text-3xl font-bold md:font-extrabold">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col grow">
            <h2 className="text-lg md:text-3xl font-bold text-(--primary)"> {user.name}</h2>
            <p className="text-[12px] text-gray-100">{user.email}</p>
            <p className="text-[12px] text-gray-100">{user.phone}</p>
            <div className="flex justify-between items-center mt-4 gap-4 w-full ">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white w-[50%] max-w-30 py-2  rounded-lg cursor-pointer hover:bg-blue-700"
                onClick={() => setIsEditProfileModalOpen((p) => !p)}
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex md:hidden justify-center bg-red-500 text-white w-[50%]  py-2  rounded-lg cursor-pointer hover:bg-red-700"
                onClick={() => {
                  sessionStorage.removeItem("CravingsUser");
                  setUser("");
                }}
              >
                Logout
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex bg-red-500 text-white px-6 py-3 ml-auto rounded-lg cursor-pointer hover:bg-red-700"
            onClick={() => {
              sessionStorage.removeItem("CravingsUser");
              setUser("");
            }}
          >
            Logout
          </motion.button>
        </div>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;

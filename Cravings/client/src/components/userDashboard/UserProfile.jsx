import React, { useState } from "react";
import { motion } from "motion/react";

import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  return (
    <>
      <div className="relative min-h-full">
        <div className="flex items-center  gap-4 p-8 w-[80%] mx-auto bg-black/20 my-4 rounded-2xl">
          <div className="bg-(--accent) w-20 aspect-square border-2 border-(--primary) rounded-full text-center text-white justify-center items-center flex text-3xl font-extrabold">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col ">
            <p className="text-3xl font-bold text-(--primary)"> {user.name}</p>
            <p className="text-[12px] text-gray-400">{user.email}</p>
            <p className="text-[12px] text-gray-400">{user.phone}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-6 py-3 ml-auto rounded-lg cursor-pointer hover:bg-blue-700"
            onClick={() => setIsEditProfileModalOpen((p) => !p)}
          >
            Edit
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

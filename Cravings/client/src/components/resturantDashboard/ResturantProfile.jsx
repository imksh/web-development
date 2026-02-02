import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "./modals/EditProfileModal";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../config/Api";

const ResturantProfile = () => {
  const { user, setUser, setIsLogin } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  // cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    updateDP(file);
  };

  const updateDP = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await api.patch(
        "/restaurant/change-photo",
        formData
      );

      setUser(res.data.data);
      sessionStorage.setItem(
        "CravingUser",
        JSON.stringify(res.data.data)
      );

      toast.success(res.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Photo update failed"
      );
    }
  };

  const handleResetPassword = () => {
    toast("Reset password coming soon");
  };

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (e) {}

    sessionStorage.removeItem("CravingUser");
    setUser(null);
    setIsLogin(false);
  };

  // 🔐 restaurant-only access
  if (user?.role !== "manager") return null;

  return (
    <>
      <div className="relative min-h-full">
        <div className="flex items-center gap-4 lg:gap-6 p-8 w-[95%] md:w-[80%] bg-black/20 my-4 rounded-2xl mx-auto">

          {/* PROFILE IMAGE */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-(--accent) w-14 sm:w-16 md:w-20 lg:w-28 aspect-square border-3 border-(--primary) rounded-full flex items-center justify-center relative"
          >
            <img
              src={preview || user?.photo?.url || "/images/avtar.png"}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -right-2 bottom-4 bg-(--primary) rounded-full p-2 cursor-pointer"
            >
              <label htmlFor="imageUpload" className="cursor-pointer">
                <FaCamera size={14} />
              </label>

              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </motion.div>
          </motion.div>

          {/* INFO */}
          <div className="flex flex-col grow">
            <h2 className="text-lg md:text-3xl font-bold text-(--primary)">
              {user?.name}
            </h2>

            <p className="text-[12px] text-gray-100">
              {user?.email}
            </p>

            <p className="text-[12px] text-gray-100">
              {user?.phone}
            </p>

            <div className="flex flex-col mt-4 gap-4 w-full md:w-fit">
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-500 text-white py-2 md:px-6 rounded-lg hover:bg-blue-700"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-500 text-white py-2 md:px-6 rounded-lg hover:bg-blue-700"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </motion.button>
              </div>

              {/* MOBILE LOGOUT */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </motion.button>
            </div>
          </div>

          {/* DESKTOP LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex bg-red-500 text-white px-6 py-3 ml-auto rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default ResturantProfile;
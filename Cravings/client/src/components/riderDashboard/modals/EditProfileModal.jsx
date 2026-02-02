import React, { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../../context/AuthContext";
import Edit from "../../../assets/animations/edit.json";
import Lottie from "lottie-react";
import api from "../../../config/Api";
import { toast } from "react-hot-toast";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    dob: user.dob,
    address: user.address,
    city: user.city,
    pin: user.pin,
    document: {
      uidai: user.document?.uidai || "",
      pan: user.document?.pan || "",
    },
    paymentDetails: {
      upi: user.paymentDetails?.upi || "",
      account_number: user.paymentDetails?.account_number || "",
      ifs_Code: user.paymentDetails?.ifs_Code || "",
    },
    geoLocation: {
      lat: user.geoLocation?.lat || "",
      lon: user.geoLocation?.lon || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await api.put("/user/update", data);
      setUser(res.data.data);
      sessionStorage.setItem("CravingsUser", JSON.stringify(res.data.data));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-99">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[90dvh] overflow-hidden shadow-2xl z-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300">
          <div className="flex items-center gap-3">
            <Lottie animationData={Edit} className="w-10" />
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Profile
            </h2>
          </div>

          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition"
          >
            ✕
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={isLoading}
              required
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              value={data.email}
              disabled
              placeholder="Email"
              className={inputClass}
            />

            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              disabled={isLoading}
              required
              className={inputClass}
            />
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 flex justify-end border-slate-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold disabled:opacity-60"
            >
              {isLoading ? "Updating..." : "Update"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
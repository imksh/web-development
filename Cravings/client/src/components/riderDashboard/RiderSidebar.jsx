import { useState, useEffect } from "react";
import { TbChartTreemap } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { TbTransactionRupee } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { motion } from "motion/react";
import dashboardImg from "../../assets/images/dashboard.png";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-hot-toast";
import api from "../../config/Api";
import { useAuth } from "../../context/AuthContext";

const data = [
  { key: "overview", icon: TbChartTreemap, name: "Overview" },
  { key: "profile", icon: ImProfile, name: "Profile" },
  { key: "orders", icon: FaCartShopping, name: "Orders" },
  { key: "transactions", icon: TbTransactionRupee, name: "Transactions" },
  { key: "help", icon: RiCustomerService2Fill, name: "Help Desk" },
];

const RiderSidebar = ({ active, setActive, show }) => {
  const [curr, setCurr] = useState("");
  const { setRider, setIsLogin } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setCurr("");
    }, 500);
  }, [curr]);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setRider("");
      setIsLogin(false);
      sessionStorage.removeItem("CravingRider");
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  return (
    <div className="pt-3 flex flex-col h-[87dvh]">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 1 }}
        className="text-xl font-bold shadow-lg p-5 flex items-center gap-2"
        onMouseEnter={() => {
          setCurr("dashboard");
        }}
        onMouseLeave={() => {
          setCurr("");
        }}
      >
        <motion.img
          animate={
            curr === "dashboard"
              ? { x: [], y: [0, -5, 0, 5, 0] }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.3 }}
          src={dashboardImg}
          alt="dashboard image"
          className=" h-8 w-auto"
        />{" "}
        {show && <span className="whitespace-nowrap">Rider Dashboard</span>}
      </motion.div>

      <div className="flex flex-col  ">
        {data.map((item, key) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 1 }}
            className={`cursor-pointer whitespace-nowrap flex gap-3 items-center hover:bg-(--accent) px-6 py-5 hover:text-white ${
              active === item.key ? "bg-(--primary) text-white" : ""
            }`}
            onClick={() => setActive(item.key)}
            onMouseEnter={() => {
              setCurr(item.key);
            }}
            onMouseLeave={() => {
              setCurr("");
            }}
          >
            <motion.div
              animate={
                curr === item.key
                  ? { x: [], y: [0, -5, 0, 5, 0] }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            >
              <item.icon size={24} />
            </motion.div>
            {show && item.name}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 1 }}
        className={`cursor-pointer whitespace-nowrap w-full flex gap-3 items-center hover:bg-(--accent) px-6 py-5 hover:text-white mt-auto ${
          active === "logout" ? "bg-(--primary) text-white" : ""
        }`}
        onMouseEnter={() => {
          setCurr("logout");
        }}
        onMouseLeave={() => {
          setCurr("");
        }}
        onClick={handleLogout}
      >
        <motion.div
          animate={
            curr === "logout" ? { x: [], y: [0, -5, 0, 5, 0] } : { x: 0, y: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <CiLogout size={24} />
        </motion.div>
        {show && "Logout"}
      </motion.button>
    </div>
  );
};

export default RiderSidebar;

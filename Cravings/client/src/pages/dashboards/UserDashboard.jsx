import { useState, useEffect, useRef } from "react";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTranscation from "../../components/userDashboard/UserTranscation";
import UserHealpdesk from "../../components/userDashboard/UserHealpdesk";
import { motion, AnimatePresence } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import UserTopBar from "../../components/userDashboard/UserTopBar";
import { useAuth } from "../../context/AuthContext";
import Lottie from "lottie-react";
import UnauthorizedLottie from "../../assets/animations/unauthorized.json";
import { toast } from "react-hot-toast";
import api from "../../config/Api";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [show, setShow] = useState(false);
  const { user, role, setUser, setIsLogin } = useAuth();
  const [contentWidth, setContentWidth] = useState(0);
  const size = useWindowSize();
  const sideBarRef = useRef(null);
  useEffect(() => {
    if (!sideBarRef.current) return;
    const rect = sideBarRef.current.getBoundingClientRect();
    setContentWidth(size.width - rect.width);
  }, [size.width]);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("CravingUser");
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  if (role != "customer") {
    return (
      <div className="w-[85%] mx-auto min-h-[87dvh] flex justify-center items-center flex-col gap-5">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Lottie animationData={UnauthorizedLottie} className="w-60 sm:w-80" />
        </motion.div>
        <h2>
          <span className="font-bold text-xl text-(--primary)">Hii {user.name},</span> <br />
          You are not logged in as Customer. Please login as customer to access
          Customer Dashboard
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-red-500 text-white hover:bg-red-700 cursor-pointer rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </div>
    );
  }
  return (
    <div
      ref={sideBarRef}
      className={
        size.width > 645
          ? "flex w-full min-h-[87dvh] overflow-hidden"
          : "flex w-full min-h-[80dvh] flex-col"
      }
    >
      {size.width > 645 ? (
        <AnimatePresence>
          <motion.div
            initial={{ width: "5%" }}
            whileHover={{ width: "20%" }}
            transition={{ duration: 0.5 }}
            className={`shadow-lg fixed h-full min-w-[70px] z-50 shrink-0 hide-scrollbar border-r border-slate-300 header-gradient overflow-hidden`}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <UserSidebar active={active} setActive={setActive} show={show} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <UserTopBar active={active} setActive={setActive} show={show} />
      )}
      <div className={`w-full sm:w-[95%] ml-auto overflow-y-auto `}>
        {active === "overview" && <UserOverview />}
        {active === "profile" && <UserProfile />}
        {active === "orders" && <UserOrders />}
        {active === "transactions" && <UserTranscation />}
        {active === "help" && <UserHealpdesk />}
      </div>

      {show && size.width > 645 && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" />
      )}
    </div>
  );
};

export default UserDashboard;

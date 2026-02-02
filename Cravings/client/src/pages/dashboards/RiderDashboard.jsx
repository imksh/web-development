import { useState, useEffect, useRef } from "react";
import RiderSidebar from "../../components/riderDashboard/RiderSidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderProfile from "../../components/riderDashboard/RiderProfile";
import RiderOrders from "../../components/riderDashboard/RiderOrders";
import RiderTranscation from "../../components/riderDashboard/RiderTranscation";
import RiderHealpdesk from "../../components/riderDashboard/RiderHealpdesk";
import { motion, AnimatePresence } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import RiderTopBar from "../../components/riderDashboard/RiderTopBar";
import { useAuth } from "../../context/AuthContext";
import Lottie from "lottie-react";
import UnauthorizedLottie from "../../assets/animations/unauthorized.json";
import { toast } from "react-hot-toast";
import api from "../../config/Api";

const RiderDashboard = () => {
  const [active, setActive] = useState("overview");
  const [show, setShow] = useState(false);

  const { user, setUser, setIsLogin } = useAuth();
  

  const size = useWindowSize();
  const sideBarRef = useRef(null);

  // sidebar width calc (optional)
  useEffect(() => {
    if (!sideBarRef.current) return;
    sideBarRef.current.getBoundingClientRect();
  }, [size.width]);

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      setUser(null);
      setIsLogin(false);
      sessionStorage.removeItem("CravingUser");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  };

  // 🔐 ROLE PROTECTION
  if (user?.role !== "partner") {
    return (
      <div className="w-[85%] mx-auto min-h-[87dvh] flex justify-center items-center flex-col gap-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Lottie
            animationData={UnauthorizedLottie}
            className="w-64 sm:w-80"
          />
        </motion.div>

        <h2 className="text-center text-lg">
          <span className="font-bold text-xl text-(--primary)">
            Hi {user?.name},
          </span>
          <br />
          You are not logged in as Rider.
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700"
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
      {/* SIDEBAR / TOPBAR */}
      {size.width > 645 ? (
        <AnimatePresence>
          <motion.div
            initial={{ width: "5%" }}
            whileHover={{ width: "20%" }}
            transition={{ duration: 0.4 }}
            className="shadow-lg fixed h-full min-w-[70px] z-50 shrink-0 hide-scrollbar border-r border-slate-300 header-gradient overflow-hidden"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <RiderSidebar
              active={active}
              setActive={setActive}
              show={show}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <RiderTopBar
          active={active}
          setActive={setActive}
          show={show}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="w-full sm:w-[95%] ml-auto overflow-y-auto">
        {active === "overview" && <RiderOverview />}
        {active === "profile" && <RiderProfile />}
        {active === "orders" && <RiderOrders />}
        {active === "transactions" && <RiderTranscation />}
        {active === "help" && <RiderHealpdesk />}
      </div>

      {/* BACKDROP */}
      {show && size.width > 645 && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}
    </div>
  );
};

export default RiderDashboard;
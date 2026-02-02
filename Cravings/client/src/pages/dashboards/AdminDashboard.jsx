import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../components/AdminDashboard/AdminSidebar";
import AdminOverview from "../../components/AdminDashboard/AdminOverview";
import AdminProfile from "../../components/AdminDashboard/AdminProfile";
import AdminOrders from "../../components/AdminDashboard/AdminOrders";
import AdminTranscation from "../../components/AdminDashboard/AdminTranscation";
import AdminHealpdesk from "../../components/AdminDashboard/AdminHealpdesk";
import { motion, AnimatePresence } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import AdminTopBar from "../../components/AdminDashboard/AdminTopBar";
import { useAuth } from "../../context/AuthContext";
import Lottie from "lottie-react";
import UnauthorizedLottie from "../../assets/animations/unauthorized.json";
import { toast } from "react-hot-toast";
import api from "../../config/Api";

const AdminDashboard = () => {
  const [active, setActive] = useState("overview");
  const [show, setShow] = useState(false);

  const { user, setUser, setIsLogin } = useAuth();

  const size = useWindowSize();
  const sideBarRef = useRef(null);

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

  // 🔐 ADMIN ROLE PROTECTION
  if (user?.role !== "admin") {
    return (
      <div className="w-[85%] mx-auto min-h-[87dvh] flex justify-center items-center flex-col gap-5">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Lottie
            animationData={UnauthorizedLottie}
            className="w-60 sm:w-80"
          />
        </motion.div>

        <h2 className="text-center">
          <span className="font-bold text-xl text-(--primary)">
            Hi {user?.name},
          </span>
          <br />
          You are not logged in as Admin.
        </h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-red-500 text-white hover:bg-red-700 rounded-lg"
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
            <AdminSidebar
              active={active}
              setActive={setActive}
              show={show}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AdminTopBar
          active={active}
          setActive={setActive}
          show={show}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="w-full sm:w-[95%] ml-auto overflow-y-auto">
        {active === "overview" && <AdminOverview />}
        {active === "profile" && <AdminProfile />}
        {active === "orders" && <AdminOrders />}
        {active === "transactions" && <AdminTranscation />}
        {active === "help" && <AdminHealpdesk />}
      </div>

      {/* BACKDROP */}
      {show && size.width > 645 && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}
    </div>
  );
};

export default AdminDashboard;
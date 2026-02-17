import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/dashboards/UserDashboard";
import useWindowSize from "./hooks/useWindowSize";
import PhoneHeader from "./components/PhoneHeader";
import PhoneTopBar from "./components/PhoneTopBar";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Lenis from "lenis";
import { useAuth } from "./context/AuthContext";
import ResturantDashboard from "./pages/dashboards/ResturantDashboard";
import RiderDashboard from "./pages/dashboards/RiderDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import RestaurantMenu from "./pages/RestaurantMenu";
import Restaurants from "./pages/Restaurants";
import MenuItemPage from "./pages/MenuItemPage";
import CartPopup from "./components/CartPopup";

const App = () => {
  const { user, isLogin } = useAuth();
  const size = useWindowSize();

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => 1 - Math.pow(1 - t, 3),
  //     smooth: true,
  //     smoothTouch: false,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  return (
    <div
      className={` overflow-x-hidden bg-slate-50  ${
        size.width < 645 && user ? `mb-[10dvh]  ` : " min-h-dvh"
      }`}
    >
      {size.width < 645 && user && <PhoneTopBar />}
      {size.width < 645 && user ? <PhoneHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/cart" element={user ? <Cart /> : <Login />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/menu" element={<RestaurantMenu />} />
        <Route path="/menu/:id" element={<MenuItemPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/user-dashboard"
          element={user ? <UserDashboard /> : <Login />}
        />
        <Route
          path="/rider-dashboard"
          element={user ? <RiderDashboard /> : <Login />}
        />
        <Route
          path="/resturant-dashboard"
          element={user ? <ResturantDashboard /> : <Login />}
        />
        <Route
          path="/admin-dashboard"
          element={user ? <AdminDashboard /> : <Login />}
        />
      </Routes>

      <CartPopup />
      <Toaster />
    </div>
  );
};

export default App;

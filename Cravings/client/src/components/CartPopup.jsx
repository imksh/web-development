import React from "react";
import { useCart } from "../context/CartContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const CartPopup = () => {
  const { items, setCart, setRestaurant } = useCart();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  if (items === 0 || location === "/cart") return null;
  return (
    <div className="flex w-60 h-16 rounded-full bg-(--primary) text-white font-bold  items-center justify-around z-99 fixed bottom-10 left-[50%] -translate-x-[50%]">
      <button
        onClick={() => {
          setCart([]);
          setRestaurant(null);
        }}
        className="cursor-pointer"
      >
        <FaRegTrashAlt size={22} />
      </button>
      {items}
      <button onClick={() => navigate("/cart")}>
        <IoIosArrowForward size={28} />
      </button>
    </div>
  );
};

export default CartPopup;

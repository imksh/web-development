import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/Api";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const RestaurantMenu = () => {
  const { state } = useLocation();
  const restaurant = state;
  console.log(state);
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    restaurant: cartRestaurant,
    cart,
    setCart,
    setRestaurant,
  } = useCart();

  const handleCart = (item) => {
    if (cartRestaurant && cartRestaurant._id != restaurant._id) {
      setCart([{ ...item, qty: 1 }]);
      setRestaurant(restaurant);
      return;
    }
    setRestaurant(restaurant);
    let flag = true;
    const updated = cart.map((i) => {
      if (i._id === item._id) {
        flag = false;
        i.qty = i.qty + 1;
      }
      return i;
    });

    if (flag) {
      setCart((prev) => [...prev, { ...item, qty: 1 }]);
    } else {
      setCart(updated);
    }
  };

  const checkCart = (id) => {
    const found = cart.find((item) => item._id === id);

    return found?.qty || 0;
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => {
      if (item._id == id) {
        if (item.qty <= 1) {
          return;
        } else {
          item.qty = item.qty - 1;
        }
      }
      return item;
    });
    setCart(updated);
  };

  useEffect(() => {
    if (!restaurant?._id) return;

    const fetchMenu = async () => {
      try {
        const { data } = await api.get(
          `/public/restaurant-menu/${restaurant._id}`,
        );

        setMenu(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurant]);

  if (!restaurant) {
    return <div className="text-center mt-10">Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= RESTAURANT INFO ================= */}
      <div className="relative h-120">
        <img
          src={
            restaurant.photo?.url ||
            "https://via.placeholder.com/1200x400?text=Restaurant"
          }
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
          <h1 className="text-3xl font-bold">{restaurant.restaurantName}</h1>
          <p className="text-sm mt-1">🍽 {restaurant.cuisine}</p>
          <p className="text-sm">
            📍 {restaurant.address}, {restaurant.city}
          </p>
        </div>
      </div>

      {/* ================= MENU SECTION ================= */}
      <div className="px-[5%] py-20">
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>

        {loading ? (
          <div>Loading menu...</div>
        ) : menu.length === 0 ? (
          <div>No menu items available</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menu
              .filter((item) => item.status === "available")
              .map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                  onClick={() => navigate(`/menu/${item._id}`)}
                >
                  {/* Dish Image */}
                  <img
                    src={
                      item.image?.[0]?.url ||
                      "https://via.placeholder.com/400x250?text=Dish"
                    }
                    alt={item.dishName}
                    className="h-48 w-full object-cover"
                  />

                  {/* Dish Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{item.dishName}</h3>
                      <span className="font-bold text-green-600">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.servingSize}
                    </p>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                        {item.type}
                      </span>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="bg-(--primary) text-white px-4 py-1 text-sm rounded-lg hover:bg-(--secondary)"
                      >
                        {checkCart(item._id) === 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCart(item);
                            }}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex gap-4 justify-around">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(item._id);
                              }}
                            >
                              -
                            </button>{" "}
                            {checkCart(item._id)}{" "}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCart(item);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;

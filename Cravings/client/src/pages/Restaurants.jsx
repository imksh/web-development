import { useEffect, useState } from "react";
import api from "../config/Api";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await api.get("/public/allRestaurants");
        setRestaurants(data.restaurants || data);
      } catch (err) {
        setError("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-dvh px-[5%] pb-10 pt-[20dvh]">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore Restaurants
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Restaurant Image */}
            <img
              src={
                restaurant.photo?.url ||
                "https://via.placeholder.com/400x250?text=No+Image"
              }
              alt={restaurant.restaurantName}
              className="h-48 w-full object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {restaurant.restaurantName}
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                🍽 {restaurant.cuisine}
              </p>

              <p className="text-gray-500 text-sm mt-1">📍 {restaurant.city}</p>

              <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                {restaurant.address}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    restaurant.isActive === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {restaurant.isActive}
                </span>

                <button
                  onClick={() =>
                    navigate("/restaurant/menu", { state: restaurant })
                  }
                  className="bg-(--primary) text-white px-4 py-2 text-sm rounded-lg hover:bg-(--secondary) cursor-pointer"
                >
                  View Menu
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;

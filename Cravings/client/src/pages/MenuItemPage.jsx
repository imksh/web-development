import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/Api";
import { useCart } from "../context/CartContext";

const MenuItemPage = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [restaurant, setRestaurantData] = useState(null);
  const [moreItems, setMoreItems] = useState([]);
  const [moreRestaurants, setMoreRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    restaurant: cartRestaurant,
    cart,
    setCart,
    setRestaurant,
  } = useCart();

  /* ================= CART LOGIC ================= */

  const checkCart = (id) => {
    const found = cart.find((i) => i._id === id);
    return found?.qty || 0;
  };

  const handleAdd = () => {
    if (!restaurant || !item) return;

    // Different restaurant case
    if (cartRestaurant && cartRestaurant._id !== restaurant._id) {
      setCart([{ ...item, qty: 1 }]);
      setRestaurant(restaurant);
      return;
    }

    setRestaurant(restaurant);

    const existing = cart.find((i) => i._id === item._id);

    if (existing) {
      const updated = cart.map((i) =>
        i._id === item._id ? { ...i, qty: i.qty + 1 } : i
      );
      setCart(updated);
    } else {
      setCart((prev) => [...prev, { ...item, qty: 1 }]);
    }
  };

  const handleRemove = () => {
    const updated = cart
      .map((i) =>
        i._id === item._id ? { ...i, qty: i.qty - 1 } : i
      )
      .filter((i) => i.qty > 0);

    setCart(updated);
  };

  /* ================= DATA FETCH ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/public/menu/${id}`);
        const menuItem = data.menu || data;
        setItem(menuItem);

        const restRes = await api.get(
          `/public/restaurant/${menuItem.resturantID}`
        );
        setRestaurantData(restRes.data);

        const more = await api.get(
          `/public/menuByRestaurant/${menuItem.resturantID}`
        );
        setMoreItems(
          more.data.filter((i) => i._id !== id).slice(0, 4)
        );

        const restros = await api.get(`/public/getAllRestaurants`);
        setMoreRestaurants(restros.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!item) return <div className="text-center mt-10">Item not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ================= HERO ================= */}
      <div className="relative h-[32rem] w-full overflow-hidden">
        <img
          src={
            item.image?.[0]?.url ||
            "https://via.placeholder.com/1200x600?text=Dish"
          }
          alt={item.dishName}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-10 text-white">
          <h1 className="text-4xl font-bold">{item.dishName}</h1>
          <p className="mt-2 text-lg">
            ₹{item.price} • {item.servingSize}
          </p>
          <p className="text-sm mt-2">
            {restaurant?.restaurantName} • {restaurant?.city}
          </p>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="max-w-6xl mx-auto bg-white p-10 -mt-16 relative z-10 rounded-2xl shadow-xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About this dish</h2>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-6 space-y-2">
              <p><strong>Cuisine:</strong> {item.cuisine}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          </div>

          {/* Right - Order Box */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Order Summary</h3>
              <p className="mt-4 text-3xl font-bold text-green-600">
                ₹{item.price}
              </p>
            </div>

            {item.status === "available" ? (
              checkCart(item._id) === 0 ? (
                <button
                  onClick={handleAdd}
                  className="mt-8 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="mt-8 flex items-center justify-between bg-orange-500 text-white py-3 px-6 rounded-lg">
                  <button onClick={handleRemove}>-</button>
                  <span>{checkCart(item._id)}</span>
                  <button onClick={handleAdd}>+</button>
                </div>
              )
            ) : (
              <div className="mt-8 text-red-500 font-semibold">
                Currently Unavailable
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MORE ITEMS ================= */}
      <div className="max-w-6xl mx-auto p-10">
        <h3 className="text-2xl font-bold mb-6">Explore More Items</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moreItems.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={m.image?.[0]?.url}
                alt={m.dishName}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">{m.dishName}</h4>
                <p className="text-sm text-gray-500">₹{m.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MORE RESTAURANTS ================= */}
      <div className="max-w-6xl mx-auto p-10 pb-20">
        <h3 className="text-2xl font-bold mb-6">Explore Restaurants</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moreRestaurants.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={r.photo?.url}
                alt={r.restaurantName}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">{r.restaurantName}</h4>
                <p className="text-sm text-gray-500">{r.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemPage;
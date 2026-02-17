import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cart, setCart, total, restaurant } = useCart();
  const navigate = useNavigate();

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    if (updated.length === 0) {
      navigate(-1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 pt-[15dvh]">
      
      {/* 🔹 Restaurant Info */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex items-center gap-5">
          <img
            src={restaurant?.photo?.url}
            alt=""
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{restaurant?.restaurantName}</h1>
            <p className="text-gray-500">{restaurant?.location}</p>
            <p className="text-gray-400 text-sm">
              {restaurant?.cuisine}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Main Section */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT SIDE – Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image[0].url}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.dishName}
                  </h2>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – Payment + Checkout */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">
            Payment Summary
          </h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{Math.round(total * 0.05)}</span>
            </div>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total Payable</span>
            <span>
              ₹{total + 40 + Math.round(total * 0.05)}
            </span>
          </div>

          <button className="mt-6 w-full bg-[#e76f3c] text-white py-3 rounded-full font-medium hover:opacity-90 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
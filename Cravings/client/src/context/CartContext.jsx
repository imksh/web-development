import { useContext, useState, useEffect, createContext } from "react";

const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")).cart || [],
  );
  const [restaurant, setRestaurant] = useState(
    JSON.parse(localStorage.getItem("cart")).restaurant || null,
  );
  const [total, setTotal] = useState(
    JSON.parse(localStorage.getItem("cart")).total || 0,
  );
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("cart")).items || 0,
  );

  useEffect(() => {
    const fun = () => {
      const sum = cart.reduce(
        (acc, item) => acc + (item.price * item.qty || 0),
        0,
      );
      setTotal(sum);
      setItems(cart.length);

      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, restaurant, total, items }),
      );
    };
    fun();
  }, [cart]);

  const value = { cart, setCart, restaurant, setRestaurant, total, items };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

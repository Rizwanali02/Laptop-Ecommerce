import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart } = useAuthContext(); 
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((acc, product) => acc + product.price, 0);
      setTotalPrice(total);
    };
    calculateTotal();
  }, [cart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      <div className="flex justify-center w-full max-w-7xl">
        <div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="flex flex-col">
            {cart?.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <img
                    src={product.mainImage.url}
                    alt="Product Image"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{product.laptopName}</h3>
                    <p className="text-gray-600">{product.laptopName}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <p className="text-xl font-bold">{product.price} Rs</p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-4">
          <h2 className="text-2xl font-bold mb-4">Total Price</h2>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Total: ${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

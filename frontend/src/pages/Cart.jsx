import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, mode } = useAuthContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((acc, product) => acc + product.price, 0);
      setTotalPrice(total);
    };
    calculateTotal();
  }, [cart]);

  const buyBtn = () => {
    toast.success("Contact on WhatsApp");
  };

  return (
    <div
      className={`flex px-5 flex-col items-center justify-center min-h-screen ${
        mode === "dark" ? "bg-slate-900 text-white" : "bg-gray-300"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      <div
        className={`flex flex-col md:flex-row justify-center w-full max-w-7xl `}
      >
        <div
          className={`w-full md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:mb-0 md:mr-4 ${
            mode === "dark" ? "bg-gray-200 text-black" : ""
          }`}
        >
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
                  </div>
                </div>
                <div className="flex gap-3">
                  <p className="text-xl font-bold">{product.price} Rs</p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:scale-95"
                  >
                    <RxCross2 size={30} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`w-full md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:ml-4 ${
            mode === "dark" ? "bg-gray-200 text-black" : ""
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Total Price</h2>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Total: ${totalPrice}</p>
          </div>
          <button
            onClick={buyBtn}
            className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Buy Now
          </button>
          <button
           
            className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
           <Link
            to="https://api.whatsapp.com/send?phone=7976157614"
            target="_blank"
          >
            WhatsApp
          </Link>
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Cart;

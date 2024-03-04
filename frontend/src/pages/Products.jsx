import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const { mode, lapy, setLapy, cart, addToCart, removeFromCart } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v2/lapy/all`,
          {
            withCredentials: true,
          }
        );
        console.log(data.allLapy);
        setLapy(data.allLapy);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  return (
    <div
      className={`${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-4 badge badge-accent badge-outline h-full">
          Latest Laptops
        </h3>
        <div className="flex flex-wrap justify-center p-5 -mx-4">
          {lapy && lapy.length > 0 ? (
            lapy.map((product) => {
              const isInCart = isProductInCart(product._id);
              return (
                <Link
                  to={`/lapy/${product._id}`}
                  key={product._id}
                  className="w-full md:w-1/3 px-4 mb-8"
                >
                  <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
                    <img
                      className="w-full h-64 transition-transform duration-300 transform hover:scale-105"
                      src={product.mainImage.url}
                      alt="Laptop"
                    />
                    <div className="p-4 flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-red-500 mb-2">
                        {product.laptopName ? product.laptopName : "New Laptop"}
                        <span className="text-sm text-gray-700 ml-2">NEW</span>
                      </h2>
                      <div>
                        {isInCart ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(product._id);
                            }}
                            className="btn btn-primary btn-outline"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="btn btn-primary btn-outline"
                          >
                            ADD CART
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <BeatLoader color="gray" size={30} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

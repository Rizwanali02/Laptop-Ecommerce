import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleLapys = () => {
  const { mode } = useAuthContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSinglelapy = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v2/lapy/singlelapy/${id}`
        );
        setProduct(data.lapy);
      } catch (error) {
        setProduct({});
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSinglelapy();
  }, [id]); // Make sure to include id in the dependency array to re-fetch data when id changes

  return (
    <div
      className={`${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      
        <div
          className={`flex flex-col md:flex-row p-6 md:p-10 border rounded-lg shadow-lg`}
        >
          <div className="md:w-1/2 md:h-80 ">
            {product.mainImage?.url && (
              <img
                src={product.mainImage.url}
                alt="Product"
                className="w-11/12 h-80 rounded-lg object-scale-down"
              />
            )}
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="md:ml-6 mt-4 md:mt-0">
              <h2 className="text-3xl font-serif font-semibold mb-2">
                {product.laptopName}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-lg font-semibold">Brand:</p>
                <p className="text-lg">{product.brand}</p>
                <p className="text-lg font-semibold">Processor:</p>
                <p className="text-lg">{product.processor}</p>
                <p className="text-lg font-semibold">RAM:</p>
                <p className="text-lg">{product.ram}</p>
                <p className="text-lg font-semibold">Storage:</p>
                <p className="text-lg">{product.storage}</p>
                <p className="text-lg font-semibold">Graphics Card:</p>
                <p className="text-lg">{product.graphicsCard}</p>
                <p className="text-lg font-semibold">Display:</p>
                <p className="text-lg">{product.displaySize}</p>
                <p className="text-lg font-semibold">Stock:</p>
                <p className="text-lg badge badge-accent badge-outline">
                  {product.stock}
                </p>
                <p className="text-lg font-semibold">Other:</p>
                <p className="text-lg badge badge-secondary badge-outline h-full">
                  {product.other}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold badge badge-error badge-outline h-full">
                  {product.price} Rs
                </span>
                <Link
                  to="https://api.whatsapp.com/send?phone=7976157614"
                  target="_blank"
                >
                  <img
                    className="whatsapp-icon-2 h-7 cursor-pointer"
                    src="/images/whatsapp.png"
                    alt="laptopmart"
                  />
                </Link>
              </div>
              <p className="">
                If you want to buy this product click on whatsapp icon and
                contact me
              </p>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default SingleLapys;

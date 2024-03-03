import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

const MyProducts = () => {
  const [myProduct, setMyProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v2/lapy/mylapys`,
          {
            withCredentials: true,
          }
        );
        setMyProduct(data.lapys);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const deleteProductHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v2/lapy/delete/${id}`, {
        withCredentials: true,
      });

      setMyProduct(myProduct.filter((product) => product._id !== id));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(myProduct);

  return (
    <div className="flex flex-wrap justify-center gap-10 p-5">
      {loading ? <BeatLoader color="gray" size={30} /> : myProduct?.map((product) => (
        <div
          key={product._id}
          className="card card-compact bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <figure>
            <img
              className="w-full h-52 transition-transform duration-300 transform hover:scale-105"
              src={product.mainImage.url}
              alt={product.laptopName} // Alt text should be dynamic
            />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-xl font-semibold">
              {product.laptopName}
            </h2>
            <div className="card-actions flex justify-end mt-4">
              <button
                className="btn btn-neutral"
                onClick={() => deleteProductHandler(product._id)}
              >
                <MdDelete className="h-full w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;

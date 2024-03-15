import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useUpdateProduct from "../../hooks/useUpdateProduct.js";
import axios from "axios";

const UpdateProducts = () => {
  const { id } = useParams();
  const { update, loading } = useUpdateProduct();
  const { mode } = useAuthContext();
  const [laptopName, setLaptopName] = useState("");
  const [brand, setBrand] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [graphicsCard, setGraphicsCard] = useState("");
  const [displaySize, setDisplay] = useState("");
  const [stock, setStock] = useState("");
  const [other, setOther] = useState("");
  const [price, setPrice] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://laptop-ecommerce-backend-chi.vercel.app/api/v2/lapy/singlelapy/${id}`,
          { withCredentials: true }
        );
        setLaptopName(data.lapy.laptopName);
        setBrand(data.lapy.brand);
        setRam(data.lapy.ram);
        setProcessor(data.lapy.processor);
        setStorage(data.lapy.storage);
        setGraphicsCard(data.lapy.graphicsCard);
        setDisplay(data.lapy.displaySize);
        setOther(data.lapy.other);
        setPrice(data.lapy.price);
    
      } catch (error) {
        console.log(`error ${error}`);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setMainImage(file);
    setImageName(file.name);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateProduct = new FormData();
    updateProduct.append("laptopName", laptopName);
    updateProduct.append("brand", brand);
    updateProduct.append("processor", processor);
    updateProduct.append("ram", ram);
    updateProduct.append("storage", storage);
    updateProduct.append("graphicsCard", graphicsCard);
    updateProduct.append("displaySize", displaySize);
    updateProduct.append("stock", stock);
    updateProduct.append("other", other);
    updateProduct.append("price", price);
    updateProduct.append("mainImage", mainImage);

    await update({ updateProduct, id });

    setLaptopName("");
    setBrand("");
    setRam("");
    setProcessor("");
    setStorage("");
    setGraphicsCard("");
    setDisplay("");
    setOther("");
    setPrice("");
    setStock("");
    setMainImage("");
    setImageName("");
  };

  return (
    <div
      className={`py-5 px-2 sm:py-20 sm:px-0 ${
        mode === "dark"
          ? "bg-gradient-to-l from-slate-800 via-slate-950 to-black text-white"
          : ""
      }`}
    >
      <form className="max-w-sm mx-auto" onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-5">
            <input
              type="text"
              id="laptopName"
              value={laptopName}
              onChange={(e) => setLaptopName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Laptop Name"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Brand"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="ram"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ram"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="Processor"
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Processor"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="storage"
              placeholder="Storage"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="graphicsCard"
              value={graphicsCard}
              onChange={(e) => setGraphicsCard(e.target.value)}
              placeholder="Graphics Card"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="display"
              value={displaySize}
              onChange={(e) => setDisplay(e.target.value)}
              placeholder="Display"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              id="other"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Other"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="other"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <select
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select Stock Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-5">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="text-gray-900 text-sm cursor-pointer"
              required
            />
            {/* Display the image name */}
            {imageName && (
              <p className="mt-2 text-white dark:text-gray-300">{imageName}</p>
            )}
          </div>

          <button
            type="submit"
            className="text-white btn btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 h-16 dark:focus:ring-blue-800"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "POST"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProducts;

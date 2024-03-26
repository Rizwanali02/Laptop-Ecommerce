import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../constant/constant";

const Register = () => {
  const { mode, setUser } = useAuthContext("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v2/user/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Clear all form fields after successful registration
      setUser(data);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      toast.success(data.message);
      navigate("/login");
      // You may also want to show a success message or navigate to a different page here
    } catch (error) {
      console.log("register error ----", error);
      toast.error("register error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`py-10 px-4 sm:py-20 sm:px-0 ${
        mode === "dark" ? "bg-gray-900 text-white" : ""
      }`}
    >
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className={`block mb-2 text-lg font-medium ${
              mode === "dark" ? "bg-gray-900 text-white" : ""
            }`}
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className={`block mb-2 text-lg font-medium ${
              mode === "dark" ? "bg-gray-900 text-white" : ""
            }`}
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className={`block mb-2 text-lg font-medium ${
              mode === "dark" ? "bg-gray-900 text-white" : ""
            }`}
          >
            Your phone number
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className={`block mb-2 text-lg font-medium ${
              mode === "dark" ? "bg-gray-900 text-white" : ""
            }`}
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirm-password"
            className={`block mb-2 text-lg font-medium ${
              mode === "dark" ? "bg-gray-900 text-white" : ""
            }`}
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <Link to="/login" className="flex items-center h-5">
            if you have account Login Here
          </Link>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;

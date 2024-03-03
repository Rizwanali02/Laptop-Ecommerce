import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  
  const { mode } = useAuthContext();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });

    setEmail("");
    setPassword("");
   
  };

  return (
    <div className={`py-10 px-4 sm:py-20 sm:px-0 ${mode === "dark" ? "bg-gray-900 text-white" : ""}`}>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
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
        <div className="flex items-start mb-5">
          <Link to="/register" className="flex items-center h-5">
            If you don't have any account, register here.
          </Link>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;

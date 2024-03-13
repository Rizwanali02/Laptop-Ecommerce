import React, { useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { CiDark } from "react-icons/ci";
import { MdSunny } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import MyProfile from "../pages/MyProfile";
export default function Navbar() {
  const {
    mode,
    setMode,
    isAuthenticated,
    user,
    setUser,
    setIsAuthenticated,
    cart,
    setCart,
  } = useAuthContext();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("lapy-user"));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, [setUser, setIsAuthenticated]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v2/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      localStorage.removeItem("lapy-user");
      localStorage.removeItem("lapy-cart");
      // setCart([]);
      localStorage.removeItem("token");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className={`${
        mode === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black"
          : "bg-gray-900"
      }`}
    >
      {({ open }) => (
        <div
          className={`${mode === "light" ? "border-b-2 border-gray-950" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <strong className="text-white text-4xl font-bold">
                    LAPTOPMART
                  </strong>
                </div>

                {user?.user.isAdmin === true ? (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to="/dashboard"
                        className={`btn btn-outline btn-accent hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                         ${mode === "dark" ? "text-white " : "text-black "}`}
                      >
                        DASHBOARD
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className={`btn btn-outline btn-error h-full hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                      ${mode === "dark" ? "text-white " : "text-black "}`}
                    >
                      HOME
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/about"
                      className={`btn btn-outline btn-info hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                      ${mode === "dark" ? "text-white " : "text-black "}`}
                    >
                      ABOUT
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <div className="indicator">
                      <span className="indicator-item badge badge-success mt-1">
                        {cart.length}
                      </span>
                      <Link
                        to="/cart"
                        className={`btn btn-outline btn-success hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                      ${mode === "dark" ? "text-white " : "text-black "}`}
                      >
                        Cart
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className={`btn btn-outline btn-warning hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                         ${mode === "dark" ? "text-white " : "text-black "}`}
                      >
                        LOGOUT
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className={`btn btn-outline btn-warning hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium cursor-pointer
                        ${mode === "dark" ? "text-white " : "text-black "}`}
                      >
                        LOGIN
                      </Link>
                    )}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="https://api.whatsapp.com/send?phone=7976157614"
                      target="_blank"
                      className=" btn btn-primary btn-outline"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        mode === "light" ? setMode("dark") : setMode("light")
                      }
                      className={mode === "light" ? "bg-white" : "bg-gray-900"}
                    >
                      {mode === "light" ? (
                        <CiDark className="text-2xl size-10  hover:text-gray-500 bg-gray-900 text-white" />
                      ) : (
                        <MdSunny className="text-2xl size-10 text-white bg-slate-950 hover:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <div className="dropdown">
                        <div tabIndex={0} role="button">
                          {mode === "light" ? (
                            <MdManageAccounts className="text-2xl size-10  hover:text-gray-500 bg-gray-900 text-white" />
                          ) : (
                            <MdManageAccounts className="text-2xl size-10 text-white bg-slate-950 hover:text-gray-400" />
                          )}
                        </div>
                        <div
                          tabIndex={0}
                          className={`dropdown-content z-[1] card card-compact w-80 p-2 shadow  ${
                            mode === "dark"
                              ? "bg-slate-700 text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          <div className="card-body">
                            <MyProfile />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                `}
              >
                HOME
              </Link>
              <Link
                to="/about"
                className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                `}
              >
                ABOUT
              </Link>

              <Link
                to="/cart"
                className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                `}
              >
                <div className="indicator">
                  <span className="indicator-item badge badge-primary mt-[14px] -mr-7">
                    {cart?.length}
                  </span>
                  CART
                </div>
              </Link>

              {user?.user.isAdmin === true ? (
                <Link
                  to="/dashboard"
                  className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                  `}
                >
                  DASHBOARD
                </Link>
              ) : (
                ""
              )}
              {isAuthenticated ? (
                <Link
                  onClick={handleLogout}
                  className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                  `}
                >
                  LOGOUT
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`btn btn-accent btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                  `}
                >
                  LOGIN
                </Link>
              )}

              <Link
                to="https://api.whatsapp.com/send?phone=7976157614"
                target="_blank"
                className={`btn btn-primary btn-outline text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white
                  `}
              >
                WhatsApp
              </Link>

              <div className="ml-3">
                <button
                  onClick={() =>
                    mode === "light" ? setMode("dark") : setMode("light")
                  }
                  className={
                    mode === "light" ? "bg-white" : "bg-gray-700 text-white"
                  }
                >
                  {mode === "light" ? (
                    <CiDark className="text-3xl bg-gray-900 text-white" />
                  ) : (
                    <CiLight className="text-3xl  bg-black text-white hover:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: user?.user?.phone || "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v2/user/myprofile/${user?.user?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      const newUser = res.data;
      setUser(newUser);
      toast.success(newUser.message);
      setIsEditing(false);
    } catch (error) {
      console.log("Error Updating User Profile", error);
      toast.error("Error Updating User Profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px1 py-1">
      <div className="max-w-lg mx-auto  rounded-lg overflow-hidden">
        <div className="">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">{user?.user.name}</h2>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="mt-1 text-gray-900">{user?.user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <p className="mt-1 text-gray-900">{user?.user.phone}</p>
          </div>
          {isEditing && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? (
                    <span className="loading-spinner loading"></span>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

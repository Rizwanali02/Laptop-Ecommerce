import React, {  useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useUpdateProfile from "../hooks/useUpdateProfile";

const MyProfile = () => {
  const { user } = useAuthContext();
  const { updateProfile, loading } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name ,
    email: user?.user?.email ,
    phone: user?.user?.phone ,
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
    await updateProfile(formData, setIsEditing);
  };

  return (
    <div className="container mx-auto px-4 py-1">
       <div className="max-w-lg mx-auto rounded-lg overflow-hidden">
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
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   className="w-full p-2 border border-gray-300 rounded-md"
                 />
               </div>
               <div>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   className="w-full p-2 border border-gray-300 rounded-md"
                 />
               </div>
               <div>
                 <input
                   type="tel"
                   id="phone"
                   name="phone"
                   value={formData.phone}
                   onChange={handleInputChange}
                   className="w-full p-2 border border-gray-300 rounded-md"
                 />
               </div>
               <div className="flex justify-end">
                 <button
                   type="submit"
                   className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
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
                   className="bg-red-500 text-white font-bold py-2 px-4 rounded"
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

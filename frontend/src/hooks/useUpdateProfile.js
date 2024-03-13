import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";


const useUpdateProfile = () => {

    const [loading, setLoading] = useState(false);
    const { setUser, user } = useAuthContext();

    const updateProfile = async (formData) => {
        setLoading(true)
        try {
            const res = await axios.put(`http://localhost:8000/api/v2/user/myprofile/${user?.user._id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            const data = res;
            console.log(data);
            setUser(data);
            toast.success(data.message);


        } catch (error) {
            console.log("Error Updateing User Profile", error);
            toast.error("Error Updateing User Profile");
        } finally {
            setLoading(false);
        }

    };
    return { updateProfile, loading };

}

export default useUpdateProfile;
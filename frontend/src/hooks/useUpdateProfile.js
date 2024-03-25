import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl, axiosConfig } from '../env/env';


const useUpdateProfile = () => {

    const [loading, setLoading] = useState(false);
    const { setUser, user } = useAuthContext();

    const updateProfile = async (formData,setIsEditing) => {
        setLoading(true)
        try {
            const res = await axios.put(
                `${serverUrl}/api/v2/user/myprofile/${user?.user?._id}`,
                formData,
                axiosConfig
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

    }
    return { updateProfile, loading };
}

export default useUpdateProfile;
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl, axiosConfig } from "../env/env";

const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser, setIsAuthenticated } = useAuthContext();

    const login = async ({ email, password }) => {
        // Handle input errors
        const success = handleInputErrors(email, password);
        if (!success) return;

        setLoading(true);
        try {
            const res = await axios.post(
                `${serverUrl}/api/v2/user/login`,
                { email, password },
                axiosConfig
            );

            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("token", data.token)
            setUser(data);
            localStorage.setItem("lapy-user", JSON.stringify(data));
            setIsAuthenticated(true);
            toast.success(data.message);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };



    return { login, loading };
};

function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

export default useLogin;

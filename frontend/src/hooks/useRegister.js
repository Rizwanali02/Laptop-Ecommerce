import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
// import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { CiVolumeHigh } from "react-icons/ci";

const useRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthContext();

    const register = async ({ name, password, confirmPassword, phone, email }) => {
        const success = handleInputsErrors({ name, password, confirmPassword, phone, email });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8000/api/v2/user/register`,
                { name, password, phone, email },
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, password, phone, email })

                }
            );

            const data = res.data; // Access response data directly

            // if (data.error) {
            //     throw new Error(data.error);
            // }
            console.log("register--data--", data);
            setUser(data);
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            console.log('Error in register', error);
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { register, loading };
};

export default useRegister;

function handleInputsErrors({ name, password, confirmPassword, phone, email }) {
    if (!name || !password || !email || !confirmPassword || !phone) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

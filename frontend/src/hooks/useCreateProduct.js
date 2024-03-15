import  { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const { setLapy } = useAuthContext();

    const createProduct = async ({ formData }) => {
        const success = handleInputsErrors({ formData });
        if (!success) return;

        setLoading(true);
        const token = localStorage.getItem("token");
        try {

            const res = await axios.post("https://laptop-ecommerce-backend-chi.vercel.app/api/v2/lapy/post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, 
            });

            setLapy(res.data);
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error creating product", error);
            toast.error("Error creating product");
        } finally {
            setLoading(false)
        }
    };

    return { createProduct, loading };
};

function handleInputsErrors({ formData }) {
    if (!formData) {
        toast.error('Please fill in all fields');
        return false;
    }
    return true;
}

export default useCreateProduct;

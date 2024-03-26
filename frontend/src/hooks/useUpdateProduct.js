import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl } from '../constant/constant';

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const { setLapy } = useAuthContext();

    const update = async ({ updateProduct, id }) => {

        setLoading(true);

        try {

            const res = await axios.put(`${backendUrl}/api/v2/lapy/update/${id}`, updateProduct, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setLapy(res.data);
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error Updateing product", error);
            toast.error("Error Updateing product");
        } finally {
            setLoading(false)
        }
    };

    return { update, loading };
};

export default useUpdateProduct

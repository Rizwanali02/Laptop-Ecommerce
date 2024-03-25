import  { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { serverUrl, axiosConfig } from '../env/env';

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const { setLapy } = useAuthContext();

    const update = async ({ updateProduct, id }) => {

        setLoading(true);
 
        try {

            const res = await axios.put(`${serverUrl}/api/v2/lapy/update/${id}`, updateProduct, axiosConfig);

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

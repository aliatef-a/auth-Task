import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (formData) => {
        setLoading(true);
        try {

            const response = await axios.post('https://print.trendline.marketing/api/auth/register', formData);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data : err.message);
            throw err;
        }
    };

    return { register, loading, error };
};

export default useRegister;

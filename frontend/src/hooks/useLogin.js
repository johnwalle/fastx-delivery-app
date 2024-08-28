import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        console.log('All the form values', "email: ", email, "password: ", password);

        const apiUrl = process.env.REACT_APP_API_URL;

        setIsLoading(true);
        try {
            const response = await axios.post(apiUrl + "/auth/login", {
                email, password
            });

            if (response.status === 200) {
                setError(null);
                console.log('user-data', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || error.message); // Capture server-side error message if available
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        error,
        isLoading
    };
};

export default useLogin;

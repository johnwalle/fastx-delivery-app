import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const register = async (fullName, email, phoneNumber, password) => {
        console.log('All the form values', "fullName", fullName, "email", email, "phoneNumber", phoneNumber, "password", password);

        const apiUrl = process.env.REACT_APP_API_URL;

        setIsLoading(true);
        try {
            const response = await axios.post(apiUrl + "/users/register", {
                fullName, email, phoneNumber, password
            });

            if (response.status === 201) {
                setError(null);
                navigate('/login'); // Navigate to the login page on success
                console.log('data', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.response?.data?.message || error.message); // Capture server-side error message if available
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        error,
        isLoading
    };
};

export default useRegister;

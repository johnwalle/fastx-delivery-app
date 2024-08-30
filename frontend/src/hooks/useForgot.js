import axios from 'axios';
import { useState } from 'react';

const useForgot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  // Changed to store error messages
    const [success, setSuccess] = useState(false);  // Added success state

    const apiUrl = process.env.REACT_APP_API_URL;

    const forgot = async (email) => {
        setIsLoading(true);
        setError(null);  // Reset error state before new request
        setSuccess(false);  // Reset success state before new request

        try {
            const response = await axios.post(apiUrl + '/auth/forgot-password', {
                email,
            });

            if (response.status === 200) {  // Check if the request was successful
                setSuccess(true);  // Set success state
            }
        } catch (error) {
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.'  // Provide a default error message
            );
        } finally {
            setIsLoading(false);  // Stop loading in both success and error cases
        }
    };

    return {
        forgot,
        isLoading,
        error,
        success,  // Return success state
    };
};

export default useForgot;

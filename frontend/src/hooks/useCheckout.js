import { useState } from 'react';
import axios from 'axios';
import authStore from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

const useCheckout = () => {
    const { userData } = authStore();
    const token = userData?.tokens?.access?.token || null;
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const checkout = async (note, location, specifics) => {
        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/checkout`,
                { delivery_instructions: note,
                  address: {
                    location: location,
                    specific_address: specifics
                  }
                 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );



            if (response.status === 200) {
                const checkoutUrl = response.data?.payment?.data?.checkout_url;
                if (checkoutUrl) {
                    setPaymentUrl(checkoutUrl);
                    window.open(checkoutUrl, '_blank');
                } else {
                    setError("Checkout URL not found in the response.");
                }
            } else {
                setError("Unexpected response from the server.");
            }
        } catch (error) {
            // Improved error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(`Error: ${error.response.data?.message || 'Something went wrong with the request.'}`);
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        checkout,
        isLoading,
        error,
        paymentUrl,
    };
};

export default useCheckout;

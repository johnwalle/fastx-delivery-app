import { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import authStore from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

const useUpdateRestaurant = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Access userData from authStore
    const { userData } = authStore();
    const token = userData?.tokens?.access?.token;
    const navigate = useNavigate();

    const updateRestaurant = async (
        {
            restaurantID,
            name,
            cuisine_types,
            description,
            address,
            working_days,
            phone_number,
            operating_hours,
            location,
            image
        }
    ) => {
        // Log the received values to ensure correct order
        console.log('Updated shek form values:', {
            restaurantID,
            name,
            cuisine_types,
            description,
            address,
            working_days,
            phone_number,
            operating_hours,
            location,
            image,
        });

        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            setError('API URL is not configured. Please check environment settings.');
            setOpen(true);
            return;
        }

    

        setIsLoading(true);
        try {
            const response = await axios.put(
                `${apiUrl}/restaurants/update/${restaurantID}`,
                {
                    name,
                    cuisine_types,
                    description,
                    address,
                    working_days,
                    phone_number,
                    operating_hours,
                    location,
                    image,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Add Bearer token here
                    },
                }
            );

            if (response.status === 200) {
                setError(null);
                setOpen(true);
                console.log('Menu item updated successfully:', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating menu item:', error);

            setOpen(true);
            if (error.response?.status === 429) {
                setError("Too Many Requests. Please try again later.");
            } else if (error.response?.status === 500) {
                setError("Server error. Please try again later.");
            } else {
                setError(error.response?.data?.message || error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // Close the Snackbar
    };

    return {
        updateRestaurant,
        error,
        isLoading,
        SnackbarComponent: (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={error ? 'error' : 'success'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error ? error : 'Restaurant updated successfully!'}
                </Alert>
            </Snackbar>
        ),
    };
};

export default useUpdateRestaurant;

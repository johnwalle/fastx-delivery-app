import { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import authStore from '../store/auth.store';

const useCreateRestaurant = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Access userData from authStore
    const { userData } = authStore();
    const token = userData?.tokens?.access?.token; // Assuming token is stored as 'token' in userData

    const createRestaurant = async ({
        name,
        email,
        cuisine_types,
        description,
        address,
        working_days,
        phone_number,
        operating_hours,
        location,
        image,
    }) => {
     

        const apiUrl = process.env.REACT_APP_API_URL;

        setIsLoading(true);
        try {
           

            const response = await axios.post(apiUrl + "/restaurants/create", {
                name,
                email,
                cuisine_types,
                description,
                address,
                working_days,
                phone_number,
                operating_hours,
                location,
                image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Add the Bearer token here
                },
            });

            if (response.status === 201) {
                setError(null);
                setOpen(true);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
            return response;
        } catch (error) {

            setOpen(true);
            if (error.response?.status === 429) {
                setError("Too Many Requests. Please try again later.");
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
        createRestaurant,
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
                    {error ? error : 'Restaurant created successfully!'}
                </Alert>
            </Snackbar>
        ),
    };
};

export default useCreateRestaurant;

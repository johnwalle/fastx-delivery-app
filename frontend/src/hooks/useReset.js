import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const useReset = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  // Store error messages
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const reset = async (token, password) => {
        setIsLoading(true);
        setError(null);  // Reset error state before new request

        try {
            const response = await axios.post(`${apiUrl}/auth/reset-password/${token}`, {
                password
            });

            if (response.status === 200) {  // Check if the request was successful
                setOpen(true);  // Show success Snackbar
                setTimeout(() => {
                    setOpen(false);  // Ensure Snackbar is closed before navigating
                    navigate('/login');  // Navigate to the login page
                }, 2000);  // Delay before navigation
            }
        } catch (error) {
            console.error("Error while resetting the password", error);
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.'  // Provide a default error message
            );
        } finally {
            setIsLoading(false);  // Stop loading in both success and error cases
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);  // Close the Snackbar
    };

    return {
        reset,
        isLoading,
        error,
        SnackbarComponent: (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Password reset successfully!
                </Alert>
            </Snackbar>
        )
    };
};

export default useReset;

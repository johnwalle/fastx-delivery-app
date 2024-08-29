import { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';


const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)


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
                setOpen(true);
                console.log('user-data', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
    
        } catch (error) {
            console.error('Login failed:', error);
            
            // Check if the error response status is 429
            if (error.response?.status === 429) {
                setError("Too Many Requests. Please try again later.");
            } else {
                // Capture server-side error message if available
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
        login,
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
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Login successful!
                </Alert>
            </Snackbar>
        )

    };
};

export default useLogin;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false); // State to control Snackbar visibility
    const navigate = useNavigate();

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
                setOpen(true); // Show success Snackbar
                setTimeout(() => {
                    navigate('/login'); // Navigate to the login page after showing the toast
                }, 2000); // Adjust the delay as needed
                console.log('data', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.response?.data?.message || error.message);
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
        register,
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
                    Registration successful!
                </Alert>
            </Snackbar>
        )
    };
};

export default useRegister;

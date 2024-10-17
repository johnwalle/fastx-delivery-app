import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const useUpdateP = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false); // State to control Snackbar visibility
    const navigate = useNavigate();

    const update = async (fullName, email, phoneNumber, token) => {
        console.log('All the form values', "fullName", fullName, "email", email, "phoneNumber", phoneNumber, );

        const apiUrl = process.env.REACT_APP_API_URL;

        setIsLoading(true);
        try {
            const response = await axios.put(apiUrl + "/users/update/myaccount", {
                fullName, email, phoneNumber
            }, {
                headers: {  
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setError(null);
                setOpen(true); // Show success Snackbar
                console.log('data', response.data);
            } else {
                setError(`Unexpected response status: ${response.status}`);
                setOpen(true); // Show error Snackbar if response is not 200
            }

        } catch (error) {
            console.error('Update failed:', error);
            setError(error.response?.data?.message || error.message);
            setOpen(true); // Show error Snackbar on catch
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
        update,
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
                    severity={error ? "error" : "success"} // Show error if exists, otherwise success
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error ? `Error: ${error}` : "Successfully updated!"}
                </Alert>
            </Snackbar>
        )
    };
};

export default useUpdateP;

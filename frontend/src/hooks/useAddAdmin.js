import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import authStore from "../store/auth.store"; // optional, if you want to access token/user data

const useAddAdmin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // if your authStore saves the logged-in user with token
  const { userData } = authStore();

  const addAdmin = async (formData) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    setIsLoading(true);
    setError(null);

    try {
      // ✅ include token from store or localStorage
      const token = userData?.tokens?.access?.token || null;


      if (!token) {
        throw new Error("Authorization token not found. Please log in again.");
      }

      // ✅ make API request
      const response = await axios.post(
        `${apiUrl}/users/create-admin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setOpen(true);
        setError(null);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
      return response;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong while creating admin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // handle Snackbar close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // Snackbar component
  const SnackbarComponent = (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={error ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error ? error : "Admin created successfully!"}
      </Alert>
    </Snackbar>
  );

  return { addAdmin, error, isLoading, SnackbarComponent };
};

export default useAddAdmin;

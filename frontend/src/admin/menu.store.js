import { menuItemClasses } from "@mui/material";
import axios from "axios";
import { create } from "zustand";

const useAdminMenuStore = create((set) => ({
    // State
    menuItem: null,
    menuItems: [],
    loading: false,
    error: null,
    notFound: false,

    // Action to set the list of menu items and restaurant
    setMenuItems: (menuItemsData) => set({ menuItems: menuItemsData }),

    // Fetch all menu items
    fetchAllMenuItems: async (token) => {
        set({ loading: true, error: null, notFound: false });

        try {
            // Fetch all menu items
            const menuItemsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/menu/my/restaurant`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('menuItemsResponse', menuItemsResponse.data);

            // Check if the response is successful
            if (menuItemsResponse.status === 200) {
                console.log('Successfully fetched all menu items');
                set({
                    menuItems: menuItemsResponse.data,
                    loading: false,
                    notFound: false,
                });
            } else if (menuItemsResponse.data.length === 0) {
                set({ notFound: true, loading: false });
            }
        } catch (error) {
            console.error('Error fetching all menu items:', error);
            set({ error: error.message, loading: false, notFound: false });
        }
    },


    // Fetch a single menu item

    fetchMenuItem: async (token, menuItemId) => {
        set({ loading: true, error: null });

        try {
            // Fetch a single menu item
            const menuItemResponse = await axios.get(`${process.env.REACT_APP_API_URL}/menu/${menuItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('menuItemResponse', menuItemResponse.data);

            // Check if the response is successful
            if (menuItemResponse.status === 200) {
                console.log('Successfully fetched menu item');
                set({
                    menuItem: menuItemResponse.data,
                    loading: false,
                });
            }
        } catch (error) {
            console.error('Error fetching menu item:', error);
            set({ error: error.message, loading: false });
        }
    },
}));

export default useAdminMenuStore;

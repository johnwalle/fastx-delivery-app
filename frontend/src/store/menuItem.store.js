import { create } from 'zustand';
import axios from 'axios';

// Create the restaurant store using Zustand
const useMenuStore = create((set) => ({
    // State
    menuItems: [],
    restaurant: null,
    loading: false,
    error: null,
    notFound: false,

    // Action to set the list of menu items and restaurant
    setMenuItems: (menuItemsData) => set({ menuItems: menuItemsData }),
    setRestaurant: (restaurantData) => set({ restaurant: restaurantData }),

    // Combined action to fetch both restaurant details and menu items
    fetchRestaurantAndMenuItems: async (restID) => {
        console.log("restaurant ID", restID);

        set({ loading: true, error: null, notFound: false });

        try {
            // Fetch the restaurant details and its menu items at the same time
            const [restaurantResponse, menuItemsResponse] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${restID}`), // Fetch restaurant details
                axios.get(`${process.env.REACT_APP_API_URL}/menu/restaurant/${restID}`), // Fetch menu items
            ]);

            // Check if both responses are successful
            if (restaurantResponse.status === 200 && menuItemsResponse.status === 200) {
                console.log('Successfully fetched restaurant and menu items');
                set({
                    restaurant: restaurantResponse.data,
                    menuItems: menuItemsResponse.data,
                    loading: false,
                    notFound: false,
                });
            } else if (menuItemsResponse.data.length === 0) {
                set({ notFound: true, loading: false });
            }
        } catch (error) {
            console.error('Error fetching restaurant and menu items:', error);
            set({ error: error.message, loading: false, notFound: false });
        }
    },
}));

export default useMenuStore;

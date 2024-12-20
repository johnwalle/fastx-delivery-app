import { create } from 'zustand';
import axios from 'axios';

// Create the restaurant store using Zustand
const useRestaurantStore = create((set) => ({
    // State
    restaurant : {},
    restaurants: [], // Changed from 'restaurant' to 'restaurants' for clarity
    loading: false,
    error: null,
    notFound: false,

    // Action to set the list of restaurants
    setRestaurants: (restaurantsData) => set({ restaurants: restaurantsData }),

    // Action to fetch all restaurants from the API
    fetchRestaurants: async (filters) => {
        set({ loading: true, error: null }); // Start loading and reset error state

        try {
            // Fetch restaurants from the API
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants?${filters}`);
            console.log('Total restaurants:', response.data.data);

            // Check if the response status is successful
            if (response.status === 200) {
                console.log('Successfully fetched restaurants');
                set({ restaurants: response.data.data, loading: false, notFound: false });
            }
            if (response.data.data.length === 0) {
                set({ notFound: true, loading: false });
            }



        } catch (error) {
            console.error('Error fetching restaurants:', error);
            set({ error: error.message, loading: false, notFound: false }); // Set error state if fetching fails
        }
    },

    // fetch a single restaurant
    fetchSingleRestaurant: async (id) => {
        set({ loading: true, error: null });

        try {
            // Fetch the restaurant data
            const restaurantResponse = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`);

            // Check if the response is successful
            if (restaurantResponse.status === 200) {
                console.log('Successfully fetched restaurant data ', restaurantResponse.data);
                set({
                    restaurant: restaurantResponse.data,
                    loading: false,
                    notFound: false,
                });
            } else {
                set({ notFound: true, loading: false });
            }
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            set({ error: error.message, loading: false, notFound: false });
        }
    },
}));

export default useRestaurantStore;

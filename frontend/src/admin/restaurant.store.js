import axios from "axios";
import { create } from "zustand";


const useAdminRestaurantStore = create((set) => ({

    // State
    restaurantData: {},
    loading: false,
    error: null,
    notFound: false,

    // Action

    // Fetch the restaurant data

    fetchRestaurantData: async (token) => {
        set({ loading: true, error: null, notFound: false });

        try {
            // Fetch the restaurant data
            const restaurantResponse = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/my-restaurant`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if the response is successful
            if (restaurantResponse.status === 200) {
                console.log('Successfully fetched restaurant data ', restaurantResponse.data);
                set({
                    restaurantData: restaurantResponse.data,
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



export default useAdminRestaurantStore;
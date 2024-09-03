// reviewStore.js
import { create } from 'zustand';
import axios from 'axios';

const useReviewStore = create((set) => ({
    // State
    reviews: [], // Store reviews
    loading: false,
    error: null,

    // Action to fetch reviews for a specific restaurant
    fetchReviews: async (restaurantID) => {
        set({ loading: true, error: null });

        try {
            // Fetch reviews from the API
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/restaurant/${restaurantID}`);
            console.log("reviews-list", response.data);
          
            if (response.status === 200) {
                set({ reviews: response.data, loading: false, error: null });
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Action to add a new review
    addReview: async (newReview) => {
        set({ loading: true, error: null });

        try {
            // Post new review to the API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, newReview);
            if (response.status === 201) {
                // Update reviews in the state with the new review added
                set((state) => ({ reviews: [...state.reviews, response.data], loading: false, error: null }));
            }
        } catch (error) {
            console.error('Error adding review:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Action to update a review
    updateReview: async (reviewID, updatedReview) => {
        set({ loading: true, error: null });

        try {
            // Put updated review to the API
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/reviews/${reviewID}`, updatedReview);
            if (response.status === 200) {
                // Update the review in the state
                set((state) => ({
                    reviews: state.reviews.map((review) =>
                        review._id === reviewID ? response.data : review
                    ),
                    loading: false,
                    error: null
                }));
            }
        } catch (error) {
            console.error('Error updating review:', error);
            set({ error: error.message, loading: false });
        }
    },
}));

export default useReviewStore;

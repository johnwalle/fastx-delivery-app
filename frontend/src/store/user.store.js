import { create } from 'zustand';
import axios from 'axios';


const userP = create((set, get) => ({
    userProfile: {},
    loading: false,
    error: null,
    getUserProfile: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('User profile:', response.data);
            if (response.status === 200) {
                set({ userProfile: response.data });
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
    // updateUserProfile: async (fullName, email, phoneNumber, token) => {
    //     set({ loading: true });
    //     try {
    //         const response = await axios.put(
    //             `${process.env.REACT_APP_API_URL}/users/update/myaccount`,
    //             { fullName, email, phoneNumber },
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }
    //         );
    //         if (response.status === 200) {
    //             console.log('User profile updated:', response.data.data.user);
    //             set({ userProfile: response.data.data.user });
    //         }
    //     } catch (error) {
    //         console.error('Error updating user profile:', error);
    //         set({ error: error.response?.data?.message || error.message });
    //     } finally {
    //         set({ loading: false });
    //     }
    // },
}));

export default userP;


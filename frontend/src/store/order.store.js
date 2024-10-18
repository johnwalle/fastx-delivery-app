import { create } from 'zustand';
import axios from 'axios';


const orderStore = create((set, get) => ({
    myOrders: {},
    loading: false,
    error: null,
    getMyOrders: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('MyOrders:', response.data);
            if (response.status === 200) {
                set({ myOrders: response.data.data.orders });
            }
        } catch (error) {
            console.error('Error fetching my orders:', error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default orderStore;


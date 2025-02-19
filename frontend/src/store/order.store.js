import { create } from 'zustand';
import axios from 'axios';


const orderStore = create((set, get) => ({
    allOrders: {},
    myOrders: {},
    order: {},
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
    //get order by id
    getOrderById: async (token, orderID) => {
        
        set({ loading: true });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/get/${orderID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Order:', response.data);      
            if (response.status === 200) {
                set({ order: response.data.data.order });
            }

        } catch (error) {
            console.error('Error while fetching an order:', error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },
    //get all orders 
    getAllOrders: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('All Orders:', response.data.data.orders);
            if (response.status === 200) {
                set({ allOrders: response.data.data.orders });
            }
        } catch (error) {
            console.error('Error fetching all orders:', error);
            set({ error: error.response?.data?.message || error.message });
        } finally {
            set({ loading: false });
        }
    },


}));

export default orderStore;


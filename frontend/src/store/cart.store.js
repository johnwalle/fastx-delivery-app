import { create } from 'zustand';
import axios from 'axios';
import { Code } from 'lucide-react';

const cartStore = create((set, get) => ({
    cart: { items: [], totalPrice: 0 },
    navigateToAll: false,
    loading: false,
    successfullyAdded: { status: false, item: null },
    successfullyRemoved: { status: false, item: null },
    cartCleared: false,
    error: { status: false, message: '', code: null }, // Add error state

    setLoading: (isLoading) => set({ loading: isLoading }),

    getCart: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                set({ cart: response.data.data.cart });
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            set({ loading: false });
        }
    },

    addToCart: async (item, quantity, token) => {
        set({ loading: true });
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/cart/add`,
                {
                    menuItemId: item._id,
                    quantity,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.status === 201) {
                console.log('Item added to cart:', item._id);
                set((state) => {
                    const existingItemIndex = state.cart.items.findIndex(
                        (cartItem) => cartItem._id === item._id
                    );

                    let updatedItems;

                    if (existingItemIndex !== -1) {
                        updatedItems = state.cart.items.map((cartItem, index) => {
                            if (index === existingItemIndex) {
                                return {
                                    ...cartItem,
                                    quantity: cartItem.quantity + quantity,
                                };
                            }
                            return cartItem;
                        });
                    } else {
                        updatedItems = [...state.cart.items, { ...item, quantity }];
                    }

                    const updatedTotalPrice = updatedItems.reduce(
                        (total, currentItem) => total + currentItem.price * currentItem.quantity,
                        0
                    );

                    return {
                        cart: { items: updatedItems, totalPrice: updatedTotalPrice },
                        successfullyAdded: { status: true, item: { ...item, quantity } },
                        error: { status: false, message: '' }, // Clear error on success
                    };
                });

                setTimeout(() => {
                    set({ successfullyAdded: { status: false, item: { ...item, quantity } } });
                }, 100);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);

            if (error.response && error.response.status === 409) {
                set({
                    error: {
                        status: true,
                        message: 'Cannot add items from different restaurants to the same cart. Please clear the cart first.',
                        code: 409,
                    }
                });
                // Clear the cart to handle the conflict
                set({ cart: { items: [], totalPrice: 0 } });
            } else {
                set({
                    error: {
                        status: true,
                        message: 'An error occurred while adding the item to the cart'
                    }
                });
            }
        } finally {
            set({ loading: false });
        }
    },

    removeFromCart: async (itemIndex, item, token) => {
        console.log("removing_item", item);
        const menuID = item.menuItem || item._id;

        set({ loading: true });
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/cart/remove`,
                { menuItemId: menuID },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                set((state) => {
                    const updatedItems = state.cart.items.filter((_, index) => index !== itemIndex);
                    const updatedTotalPrice = updatedItems.reduce(
                        (total, currentItem) => total + currentItem.price * currentItem.quantity,
                        0
                    );
                    return {
                        cart: { items: updatedItems, totalPrice: updatedTotalPrice },
                        successfullyRemoved: { status: true, item: item },
                        error: { status: false, message: '' }, // Clear error on success
                    };
                });

                // Automatically clear success state after a delay (to allow Snackbar trigger)
                setTimeout(() => {
                    set({ successfullyRemoved: { status: false, item: item } });
                }, 100);
            }
        } catch (error) {
            console.error('Error while removing:', error);
        } finally {
            set({ loading: false });
        }
    },

    clearCart: async (token) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/cart/clear`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                set({ cart: { items: [], totalPrice: 0 }, navigateToAll: true });
                set({ cartCleared: true });
            }

            setTimeout(() => {
                set({ cartCleared: false });
            }, 100);

        } catch (error) {
            console.error('Error clearing the cart:', error);
        } finally {
            set({ loading: false });
        }
    },

    clearAllCart: () => {
        set({ cart: { items: [], totalPrice: 0 }, navigateToAll: true });
    },

    clearError: () => {
        set({ error: { status: false, message: '' } });
    },

    getCartItemCount: () => get().cart.items.length,
    getTotalPrice: () => get().cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));

export default cartStore;

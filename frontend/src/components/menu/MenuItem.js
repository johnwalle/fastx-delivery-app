import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import burger from '../../pages/RestaurantDetail/assets/burger.png';
import authStore from '../../store/auth.store';
import QuantityModal from '../Quantity'; // Ensure correct import path
import cartStore from '../../store/cart.store';
import { Snackbar, Alert } from '@mui/material'; // Import Alert from MUI
import ErrorCard from '../error'; // Import the ErrorCard component


function MenuItem({ menuItems }) {
    const [selected, setSelected] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [snackbarState, setSnackbarState] = useState({ open: false, message: '', type: '' });

    // Access state and actions from the Zustand store
    const { userData } = authStore((state) => ({
        userData: state.userData,
    }));


    // Get user data from auth store
    const userRole = userData?.user?.role;

    const token = userData?.tokens?.access?.token;
    const navigate = useNavigate();

    const { addToCart, getCart, loading, successfullyAdded, clearCart, successfullyRemoved, cartCleared, error, clearError } = cartStore((state) => ({
        addToCart: state.addToCart,
        loading: state.loading,
        successfullyAdded: state.successfullyAdded,
        successfullyRemoved: state.successfullyRemoved,
        cartCleared: state.cartCleared,
        error: state.error,
        clearError: state.clearError,
        clearCart: state.clearCart,
        getCart: state.getCart,

    }));

    console.log('errrrrrrrrror', error);

    // Handle item click for cart
    const cartHandler = (item) => {
        if (userData) {
            setCurrentItem(item);
            setIsModalOpen(true);
        } else {
            navigate('/login'); // Navigate to the login page
        }
    };

    // Handle Add to Cart
    const handleAddToCart = (item, quantity) => {
        addToCart(item, quantity, token); // Add the item to the cart with the selected quantity
    };

    useEffect(() => {
        if (menuItems && menuItems.length > 0) {
            const categories = Object.keys(groupItemsByCategory(menuItems));
            setSelected(categories[0]);
            setSelectedCuisine(categories[0]);
            filterMenu(categories[0]);
        }
    }, [menuItems]);

    // Group items by category
    const groupItemsByCategory = (items) => {
        return items.reduce((groupedItems, item) => {
            const { category } = item;
            if (!groupedItems[category]) {
                groupedItems[category] = [];
            }
            groupedItems[category].push(item);
            return groupedItems;
        }, {});
    };

    const groupedMenuItems = groupItemsByCategory(menuItems);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCuisine(selectedValue);
        filterMenu(selectedValue);
    };

    // Filter the menu by selected category
    const filterMenu = (category) => {
        const result = groupedMenuItems[category] || [];
        setMenuList(result);
    };

    // Show the Snackbar when an item is successfully added
    useEffect(() => {
        if (successfullyAdded.status) {
            setSnackbarState({
                open: true,
                message: `${successfullyAdded.item?.name} X${successfullyAdded.item?.quantity} added to the cart.`,
                type: 'success',
            });
        }
    }, [successfullyAdded.status]);

    // Show the Snackbar when an item is successfully removed
    useEffect(() => {
        if (successfullyRemoved.status) {
            setSnackbarState({
                open: true,
                message: `${successfullyRemoved.item?.ItemName} removed from the cart.`,
                type: 'error',
            });
        }
    }, [successfullyRemoved.status]);

    // Show the Snackbar when cart is cleared
    useEffect(() => {
        if (cartCleared) {
            setSnackbarState({
                open: true,
                message: 'Cart cleared.',
                type: 'error',
            });
        }
    }, [cartCleared]);

    // Close the Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarState({ ...snackbarState, open: false });
    };

    // Handle closing of error card
    const handleClearCart = () => {
        clearCart(token);
        clearError();
    };

    return (
        <div>
            <div className="grid grid-cols-4">
                <div className="hidden md:flex flex-col mr-10 gap-2">
                    {Object.keys(groupedMenuItems).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                filterMenu(category);
                                setSelected(category);
                            }}
                            className={`${selected === category ? 'text-red-500' : 'text-gray-200'} justify-start flex lg:w-3/4`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="md:hidden mb-3">
                    <select
                        value={selectedCuisine}
                        onChange={handleSelectChange}
                        className="bg-transparent text-white border-red-700 focus:border-red-700"
                    >
                        {Object.keys(groupedMenuItems).map((category, index) => (
                            <option className="text-black" key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-3 col-span-4">
                    <h2 className="font-extrabold text-lg">{selected}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                        {menuList.map((item) => (
                            <div
                                key={item.id}
                                className="p-2 flex gap-3 border rounded-xl hover:border-primary cursor-pointer"
                            >
                                <img
                                    src={item.image || burger}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                    className="h-[120px] w-[120px] object-cover rounded-xl"
                                />
                                <div className="flex flex-col gap-1 w-full">
                                    <h2 className="font-bold text-lg">{item.name}</h2>
                                    <div className="text-gray-400 line-clamp-2 text-sm">{item.description}</div>
                                    <div className="flex justify-between pr-5">
                                        <div className="md:text-lg text-sm text-white">{item.price} Birr</div>


                                        {
                                            userRole === 'user' && (
                                                <ShoppingCart
                                                    className="text-red-700 hover:text-red-400 cursor-pointer"
                                                    onClick={() => cartHandler(item)}
                                                />)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Snackbar for actions */}
                <Snackbar
                    open={snackbarState.open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={snackbarState.type === 'success' ? 'success' : 'error'}
                        variant="filled"
                        sx={{
                            width: '100%',
                            backgroundColor: snackbarState.type === 'success' ? 'green' : 'red' // Set background color
                        }}
                    >
                        {snackbarState.message}
                    </Alert>
                </Snackbar>
            </div>
            {/* Quantity Modal */}
            <QuantityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleAddToCart}
                item={currentItem}
                loading={loading}
            />
            {/* Error Card */}
            {error.status && error.code && error.code === 409 && (
                <ErrorCard
                    message={error.message}
                    onClear={() => handleClearCart()}
                    onCancel={() => {
                        clearError(); // Clear the error
                        getCart(token); // Fetch the cart again
                    }}
                />
            )}

        </div>
    );
}

export default MenuItem;

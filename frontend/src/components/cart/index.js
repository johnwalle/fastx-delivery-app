import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import cartStore from '../../store/cart.store';
import authStore from '../../store/auth.store';

function Cart({onClose}) {
    const { userData } = authStore((state) => ({
        userData: state.userData,
    }));

    const token = userData?.tokens?.access?.token;

    const { cart, getCart, removeFromCart, clearCart } = cartStore((state) => ({
        cart: state.cart,
        getCart: state.getCart,
        removeFromCart: state.removeFromCart,
        clearCart: state.clearCart,
    }));

    useEffect(() => {
        if (token) {
            getCart(token);
        }
    }, [token, getCart]);

    const handleRemoveItem = (item, index) => {
        if (token) {
            removeFromCart(index, item, token);
        } else {
            console.error('User is not authorized');
        }
    };

    const handleClearCart = () => {
        if (token) {
            clearCart(token);
        } else {
            console.error('User is not authorized');
        }
    };

    if (!cart.items || cart.items.length === 0) {

        return <div class="flex max-w-[350px] flex-col justify-center items-center text-center">
            <img width="70" height="70" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/50/external-empty-cart-web-store-flaticons-lineal-color-flat-icons-2.png" alt="external-empty-cart-web-store-flaticons-lineal-color-flat-icons-2" />
            <h2 class="text-2xl font-bold text-[#A40C0C] mt-4">Your Cart is Empty</h2>
            <p class="text-blue-600 text-sm mt-1">Looks like you haven't added anything to your cart yet. Start adding items to see them here!</p>
        </div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-5">
                <div className="text-lg font-extrabold text-black">Burger Bliss</div>
                <div
                    className="px-2 py-1 font-bold text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-md cursor-pointer"
                    onClick={handleClearCart}
                >
                    Clear
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="font-bold text-lg text-black">My Order</div>
                {cart.items.map((item, index) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-center gap-8 border p-2 rounded-lg shadow-md"
                    >
                        <div className="flex gap-2 items-center w-1/2">
                            <img
                                src={item.ItemImage}
                                alt={item.ItemName}
                                width={40}
                                height={40}
                                className="h-[40px] w-[40px] rounded-lg object-cover"
                            />
                            <div className="text-sm text-black break-words w-1/2">{item.ItemName}</div>
                        </div>
                        <div className="text-black flex-shrink-0 text-right w-[50px]">
                            x{item.quantity}
                        </div>
                        <div className="font-bold flex items-center gap-2 text-sm text-black text-right w-[80px] flex-shrink-0">
                            ${item.price.toFixed(2)}
                            <X
                                className="text-red-500 h-4 w-4 cursor-pointer"
                                onClick={() => handleRemoveItem(item, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Link to={`/checkout?restaurant=${cart.items[0]?.restaurant}`}>
                <button onClick={onClose} className="primary w-full mt-5">
                    Checkout ${cart.totalPrice.toFixed(2)}
                </button>
            </Link>
        </div>
    );
}

export default Cart;

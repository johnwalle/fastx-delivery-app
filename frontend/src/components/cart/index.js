import React from 'react'
import burger from './assets/burger.png'
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

function Cart() {
    const cart = [
        {
            name: "Cheeseburger",
            price: 8.99
        },
        {
            name: "Pepperoni Pizza",
            price: 12.50
        },
        {
            name: "California Roll",
            price: 10.75
        },
        {
            name: "Spaghetti Carbonara",
            price: 14.00
        },
        {
            name: "Caesar Salad",
            price: 7.50
        }
    ];

    const removeItemFromCart = (item) => {
        console.log('item removed: ', item);
    }

    const clearCart = () => {
        console.log('cart cleared')
    }

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='text-lg font-extrabold text-black'>Burger Bliss</div>
                <div
                    className='px-2 py-1 bg-black text-red-500 border border-red-500 rounded-md cursor-pointer'
                    onClick={clearCart}>
                    Clear
                </div>
            </div>
            <div className='flex flex-col gap-3 mt-5'>
                <div className='font-bold text-lg text-black'>My Order</div>
                {cart.map((item, index) => (
                    <div key={index} className='flex justify-between items-center gap-8'>
                        <div className='flex gap-2 items-center w-1/2'>
                            <img
                                src={burger}
                                alt={'burger'}
                                width={40}
                                height={40}
                                className='h-[40px] w-[40px] rounded-lg object-cover'
                            />
                            <div className='text-sm text-black break-words'>{item.name}</div>
                        </div>
                        <div className='text-black flex-shrink-0 text-right w-[50px]'>
                            x{item.quantity ? item.quantity : '2'}
                        </div>
                        <div className='font-bold flex items-center gap-2 text-sm text-black text-right w-[80px] flex-shrink-0'>
                            ${item.price.toFixed(2)}
                            <X className='text-red-500 h-4 w-4 cursor-pointer'
                                onClick={() => removeItemFromCart(item.name)}
                            />
                        </div>
                    </div>
                ))}


            </div>
            <Link href={'/checkout?restaurant=' + cart[0]?.restaurant?.name}>
                <button
                    className="primary w-full mt-5">Checkout $4.99</button>
            </Link>
        </div>
    )
}

export default Cart
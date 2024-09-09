import React from 'react'
import MyOrder from '../../components/myOrder';
import OrderNote from '../../components/orderNote';
import Location from '../../components/location';

function CheckoutPage() {
    const cartItems = [
        {
            image: "https://example.com/images/burger.png",
            name: "Cheeseburger",
            price: 8.99,
            quantity: 4
        },
        {
            image: "https://example.com/images/pizza.png",
            name: "Pepperoni Pizza",
            price: 12.50,
            quantity: 4
        },
        {
            image: "https://example.com/images/sushi.png",
            name: "California Roll",
            price: 10.75,
            quantity: 4
        },
        {
            image: "https://example.com/images/pasta.png",
            name: "Spaghetti Carbonara",
            price: 14.00,
            quantity: 4
        },
        {
            image: "https://example.com/images/salad.png",
            name: "Caesar Salad",
            price: 7.50,
            quantity: 4
        },
    ];

    return (
        <div className='pl-80 pr-60 pt-24 pb-5'>
            <div className='grid grid-cols-4 items-end gap-4'>
                <div className='col-span-3'>
                    <MyOrder cartItems={cartItems} />
                </div>
                <div className='col-span-1'>
                    <OrderNote />
                </div>
            </div>
            <div className='mt-14'>
                <Location />
            </div>
            <hr className='mt-7' />
            <div className="quick-tips p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Quick Tips</h2>
                <ul className="list-disc pl-5 text-white">
                    <li className="mb-2">
                        <strong>Double-check your delivery address</strong> — Make sure your address is correct to avoid any delays in delivery.
                    </li>
                    <li className="mb-2">
                        <strong>Review your cart items</strong> — Ensure all items are correct before placing your order, including quantities and special instructions.
                    </li>
                    <li className="mb-2">
                        <strong>Watch out for delivery fees</strong> — Take note of the delivery fee, especially for long distances, and confirm before placing your order.
                    </li>
                    <li className="mb-2">
                        <strong>Review the grand total</strong> — Review the grand total, including taxes and delivery charges, to avoid any surprises.
                    </li>
                </ul>
            </div>
            <div className='w-full mt-5'>
                <button className='primary w-full'>Confirm your order</button>
            </div>
        </div>

    )
}

export default CheckoutPage
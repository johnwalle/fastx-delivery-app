import React, { useEffect } from 'react'
import MyOrder from '../../components/myOrder';
import burger from './assets/burger.png'
import ItemsOrdered from '../../components/itemsOrdered';
import OrderSummary from '../../components/orderSummary';
import { useParams } from 'react-router-dom'
import authStore from '../../store/auth.store';
import orderStore from '../../store/order.store';

function OrderConfirmationPage() {
    // const order = {
    //     orderNumber: '123456',
    //     orderDate: 'September 9, 2024, 12:45 PM',
    //     items: [
    //         { ItemName: 'Burger Deluxe', quantity: 1, price: 8.99, ItemImage: burger },
    //         { ItemName: 'Fries', quantity: 2, price: 4.99, ItemImage: burger },
    //         { ItemName: 'Chocolate Milkshake', quantity: 1, price: 5.99, ItemImage: burger },
    //     ],
    //     subtotal: 19.97,
    //     deliveryFee: 3.0,
    //     tax: 2.5,
    //     total: 25.47,
    //     address: '123 Main Street, Apt 5, Springfield, IL',
    //     estimatedTime: '30-40 minutes',
    //     paymentMethod: 'Credit Card ending in 1234',
    // };
    const { orderID } = useParams();

    const userData = authStore();
    const { getOrderById, order } = orderStore();

    const token = userData?.tokens?.access?.token


    useEffect(() => {
        getOrderById(token, orderID)
    }, [token, orderID])

    return (
        <div className='max-w-3xl mx-auto pt-24 pb-5'>
            {/* Success Message */}
            <div className='text-center'>
                <i className="text-green-500 text-5xl">✔</i>
                <h1 className="text-3xl font-bold mt-4">Order Confirmed!</h1>
                <p className="text-green-600 mt-2">Thank you for your order. Your delicious food is being prepared!</p>
            </div>
            <OrderSummary order={order} />
            {/* Items Ordered */}
            <ItemsOrdered order={order} />
        </div>
    )
}

export default OrderConfirmationPage
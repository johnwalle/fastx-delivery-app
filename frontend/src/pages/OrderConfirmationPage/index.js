import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderSummary from '../../components/orderSummary';
import authStore from '../../store/auth.store';
import orderStore from '../../store/order.store';

function OrderConfirmationPage() {
    const { orderID } = useParams();
    const { userData } = authStore();
    const { getOrderById, order, loading, error } = orderStore();
    const token = userData?.tokens?.access?.token;

    useEffect(() => {
        if (token && orderID) {
            getOrderById(token, orderID);
        }
    }, [token, orderID]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='max-w-3xl mx-auto pt-24 pb-5'>
            <div className='text-center'>
                <i className="text-green-500 text-2xl md:text-5xl">✔</i>
                <h1 className="text-xl md:text-3xl font-bold mt-4">Order Confirmed!</h1>
                <p className="text-green-600 mt-2 text-sm md:text-md">Thank you for your order. Your delicious food is being prepared!</p>
            </div>
            <OrderSummary order={order} />
            <ItemsOrdered order={order} />
        </div>
    );
}

// Inline ItemsOrdered component
function ItemsOrdered({ order }) {
    if (!order || !order.OrderItems) {
        return <p className="text-center text-gray-400">No items ordered yet.</p>;
    }

    return (
        <div className='px-5 lg:px-0'>
        <h3 className="mt-4 text-lg font-semibold">Items Ordered</h3>
        <div className='border border-white rounded-lg mt-2 p-5 text-white'>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='mb-3 w-1/2 text-lg text-red-500'>Items</div>
                    <div className='text-lg text-red-500'>Quantity</div>
                    <div className='text-lg text-red-500'>Price</div>
                </div>
                {order.OrderItems.map((item, index) => (
                    <div className='flex justify-between mb-1'>
                        <div className="flex gap-2 items-center w-1/2">
                            <img
                                src={item.ItemImage}
                                alt={'burger-img'}
                                width={40}
                                height={40}
                                className="h-[40px] w-[40px] rounded-lg object-cover"
                            />
                            <div className="text-sm text-white break-words w-1/2">{item.ItemName}</div>
                        </div>
                        <div className='flex-shrink-0 text-right w-[50px]'>{item.quantity}</div>
                        <div className='text-right w-[80px] flex-shrink-0'>Birr {item.price.toFixed(2)}</div>
                    </div>
                ))}
                <hr className='mt-2' />
                <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Grand total:</span>Birr {order.total_price.toFixed(2)}</div>
                <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Delivery Fee:</span> Birr {order.delivery_fee.toFixed(2)}</div>
                <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Subtotal:</span>Birr {order.total_amount.toFixed(2)}</div>
            </div>
        </div>
    </div>
    );
}

export default OrderConfirmationPage;

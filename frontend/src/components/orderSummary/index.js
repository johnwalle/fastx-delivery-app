import React from 'react'

function OrderSummary({ order }) {
    return (
        <div>
            <div className='flex justify-between items-center'>
                {/* Order Summary */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <p className="mt-2"><strong>Order Number:</strong> {order.orderNumber}</p>
                    <p><strong>Order Date:</strong> {order.orderDate}</p>
                </div>
                {/* Delivery Information */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">Delivery Information</h3>
                    <p className="mt-2"><strong>Address:</strong> {order.address}</p>
                    <p><strong>Estimated Delivery Time:</strong> {order.estimatedTime}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
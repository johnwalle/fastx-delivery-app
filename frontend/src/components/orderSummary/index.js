import React, { useEffect } from 'react'

function OrderSummary({ order }) {
    useEffect(()=>{
        console.log(order)
    },[])
    return (
        <div>
            <div className='flex md:justify-between md:flex-row flex-col px-5 lg:px-0 md:items-center'>
                {/* Order Summary */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <p className="mt-2"><strong>Order Number: </strong>{order._id}</p>
                    <p><strong>Order Date:</strong> {new Date(order.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                {/* Delivery Information */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">Delivery Information</h3>
                    <p className="mt-2"><strong>Address:</strong> {order.address.location}, {order.address.specific_address}</p>
                    <p><strong>Estimated Delivery Time: </strong>30-40 minutes</p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
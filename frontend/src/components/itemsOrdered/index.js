import React from 'react'

function ItemsOrdered({ order }) {
    return (
        <div>
            <h3 className="mt-4 text-lg font-semibold">Items Ordered</h3>
            <div className='border border-white rounded-lg mt-2 p-5 text-white'>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='mb-3 w-1/2 text-lg text-red-500'>Items</div>
                        <div className='text-lg text-red-500'>Quantity</div>
                        <div className='text-lg text-red-500'>Price</div>
                    </div>
                    {order.items.map((item, index) => (
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
                            <div className='text-right w-[80px] flex-shrink-0'>${item.price}</div>
                        </div>
                    ))}
                    <hr className='mt-2' />
                    <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Subtotal:</span>${order.subtotal}</div>
                    <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Delivery Fee:</span>${order.deliveryFee}</div>
                    <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Grand total:</span>${order.total}</div>
                </div>
            </div>
        </div>
    )
}

export default ItemsOrdered
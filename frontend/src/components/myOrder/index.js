import React from 'react'
import burger from '../../pages/CheckoutPage/assets/burger.png'

function MyOrder({ cartItems }) {
    return (
        <div>
            <h2 className='text-xl'>1. Confirm Your Order Details</h2>
            <div className='border border-white rounded-lg mt-6 p-5 text-white'>
                <div className='text-xl font-bold'>My Order</div>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='mt-5 mb-3 w-1/2 text-lg text-red-500'>Items</div>
                        <div className='text-lg text-red-500'>Quantity</div>
                        <div className='text-lg text-red-500'>Price</div>
                    </div>
                    {cartItems.map((item, index) => (
                        <div className='flex justify-between mb-1'>
                            <div className="flex gap-2 items-center w-1/2">
                                <img
                                    src={burger}
                                    alt={'burger-img'}
                                    width={40}
                                    height={40}
                                    className="h-[40px] w-[40px] rounded-lg object-cover"
                                />
                                <div className="text-sm text-white break-words w-1/2">{item.name}</div>
                            </div>
                            <div className='flex-shrink-0 text-right w-[50px]'>{item.quantity}</div>
                            <div className='text-right w-[80px] flex-shrink-0'>${item.price.toFixed(2)}</div>
                        </div>
                    ))}
                    <hr className='mt-2' />
                    <div className='mt-3 flex justify-end'><span className='text-blue-500 mr-1'>Subtotal:</span>$54.10</div>
                </div>
            </div>
            <div className='p-5 border border-white rounded-lg mt-5 text-white'>
                <div className='text-white font-bold text-xl'>Order Summary</div>
                <div className='flex justify-between mt-3'>
                    <div className='text-blue-500'>Subtotal:</div>
                    <div>$54.10</div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className='text-blue-500'>Delivery Fee:</div>
                    <div>$1.10</div>
                </div>
                <hr className='mt-2' />
                <div className='flex justify-between mt-3'>
                    <div className='text-blue-500'>Grandt total:</div>
                    <div>$55.20</div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
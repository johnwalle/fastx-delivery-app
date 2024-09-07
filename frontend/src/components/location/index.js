import React from 'react'
import map from '../../pages/CheckoutPage/assets/map.png'

function Location() {
    return (
        <div>
            <h2 className='text-xl'>2. Enter Delivery Address</h2>
            <div className='mt-6 mb-10'>
                <label className='text-white block'>Create a name for your location (required)</label>
                <input className='w-1/2 mt-2' />
                <label className='text-white block mt-4'>Describe your location (required)</label>
                <input className='w-1/2 mt-2' />
            </div>
            <div>
                <img src={map} width={100} className='w-full h-[300px] object-cover rounded-lg' />
            </div>
        </div>
    )
}

export default Location
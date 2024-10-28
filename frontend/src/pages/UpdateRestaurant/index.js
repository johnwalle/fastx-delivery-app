import React from 'react'
import UpdateRestaurantForm from '../../components/updateRestaurantForm'

function UpdateRestaurant() {
    return (
        <div className="pt-24 pb-7">
            <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Restaurant Profile</h1>
                <UpdateRestaurantForm />
            </div>
        </div>
    )
}

export default UpdateRestaurant
import React from 'react'
import UpdateRestaurantForm from '../../components/updateRestaurantForm';
import { useParams } from 'react-router-dom';
function UpdateMenuItems() {

    const { restaurantId } = useParams();

    return (
        <div className='pt-24 pb-7'>
            <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Update Restaurant Info</h1>
                <UpdateRestaurantForm restaurantId={restaurantId} />
            </div>
        </div>
    )
}

export default UpdateMenuItems

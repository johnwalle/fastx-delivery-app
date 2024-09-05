import React from 'react';
import RestaurantForm from '../../components/restaurantForm';
import useCreateRestaurant from '../../hooks/useCreateRestaurant';

const CreateRestaurantPage = () => {
    return (
        <div className='pt-24 pb-7'>
            <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Create Restaurant</h1>
                <RestaurantForm />
            </div>
        </div>
    );
};

export default CreateRestaurantPage;

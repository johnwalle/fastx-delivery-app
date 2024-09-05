import React from 'react';
import CreateMenu from '../../components/createMenu';

const CreateRestaurantPage = () => {
    return (
        <div className='pt-24 pb-7'>
            <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Create Menu Items</h1>
                <CreateMenu />
            </div>
        </div>
    );
};

export default CreateRestaurantPage;

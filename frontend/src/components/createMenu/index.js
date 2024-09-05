import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateMenuItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null, // Update to handle file uploads
        restaurantEmail: '' // Change to restaurant email
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0] // Update to handle file upload
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                formDataToSend.append(key, formData[key]);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('/api/menuItems', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); // Adjust the API endpoint as needed
            console.log('Menu item created:', response.data);
        } catch (error) {
            console.error('Error creating menu item:', error);
        }
    };

    return (
        <div className='pt-24 pb-7'>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4">Create Menu Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">Category</label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">Restaurant Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.restaurantEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    );
};

export default CreateMenuItem;

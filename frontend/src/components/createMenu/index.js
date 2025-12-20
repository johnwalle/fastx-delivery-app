import React, { useState } from 'react';
import useCreateMenuItems from '../../hooks/useCreateMenuItems';


const MenuItemForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null, // Update to handle file uploads
        restaurantEmail: '' // Change to restaurant email
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
        if (errors.image) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '',
            }));
        }
    };

    const validateStep = () => {
        const newErrors = {};

        // Validation checks for required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.restaurantEmail.trim()) newErrors.restaurantEmail = 'Email is required';
        else if (!formData.restaurantEmail.includes('@')) newErrors.restaurantEmail = 'Invalid Email';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.price.trim()) newErrors.price = 'Price is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.image) newErrors.image = 'Image is required';
        // Set errors and return validation status
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const {
        createMenu,
        isLoading,
        SnackbarComponent
    } = useCreateMenuItems();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) return;

        // Destructure formData to get individual values
        const {
            name,
            description,
            price,
            category,
            image,
            restaurantEmail
        } = formData;

        try {
            const response = await createMenu({
                name,
                description,
                price,
                category,
                image,
                restaurantEmail
            });
            if(response.status === 201){
                // Reset form on successful submission
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    image: null,
                    restaurantEmail: ''
                });
            }
        } catch (error) {
            console.error('Error creating menu item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
                    Menu Item Name <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter the name of the menu item. E.g., "Grilled Salmon".</p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="description">
                    Description <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Provide a brief description of the menu item. E.g., "A delicious grilled salmon served with a side of vegetables".</p>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-500'} rounded`}
                    rows="4"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="price">
                    Price <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter the price of the menu item. E.g., "10.99".</p>
                <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="category">
                    Category <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter the category of the menu item. E.g., "Burger".</p>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="image">
                    Menu Item Image <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Upload an image of the menu item.</p>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    className={`w-full cursor-pointer p-2 border ${errors.image ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="restaurantEmail">
                    Restaurant Email <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter a valid email address for restaurant contact. E.g., "info@sunsetbistro.com".</p>
                <input
                    type="email"
                    name="restaurantEmail"
                    id="restaurantEmail"
                    value={formData.restaurantEmail}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.restaurantEmail ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.restaurantEmail && <p className="text-red-500 text-sm mb-2">{errors.restaurantEmail}</p>}
            </div>

            <button
                type="submit"
                className={`primary transition duration-300 flex items-center justify-center ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white p-2 rounded`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path d="M4 12a8 8 0 0 1 8-8v8h-8z" fill="currentColor" />
                    </svg>
                ) : null}
                {isLoading ? 'Creating...' : 'Create Menu'}
            </button>
            {SnackbarComponent}
        </form>
    );
};

export default MenuItemForm;

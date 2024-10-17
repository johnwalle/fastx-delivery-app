import React, { useEffect, useState } from 'react';
import useUpdateMenuItem from '../../admin/hooks/useUpdateMenu';
import useAdminMenuStore from '../../admin/menu.store';
import authStore from '../../store/auth.store';
import Loader from '../loader/spinner.loader';

function UpdateMenu({ menuItemId }) {
    const { userData } = authStore();
    const token = userData?.tokens?.access?.token || null;

    const { fetchMenuItem, menuItem, loading } = useAdminMenuStore();

    // State to hold the form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    // State to hold the image URL for preview
    const [imagePreview, setImagePreview] = useState(null);

    const [errors, setErrors] = useState({});
    const {
        updateMenu,
        isLoading,
        SnackbarComponent
    } = useUpdateMenuItem();

    useEffect(() => {
        fetchMenuItem(token, menuItemId);
    }, [fetchMenuItem, menuItemId, token]);

    // Update formData when menuItem is fetched
    useEffect(() => {
        if (menuItem) {
            setFormData({
                name: menuItem.name,
                description: menuItem.description,
                price: menuItem.price,
                category: menuItem.category,
                image: null, // You may want to handle existing image differently
            });
            // Set the image preview if available
            if (menuItem.image) {
                setImagePreview(menuItem.image); // Assuming menuItem.image holds the image URL
            }
        }
    }, [menuItem]);

    if (loading) {
        return <Loader />;
    }

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
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));

        // Update image preview
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }

        if (errors.image) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '',
            }));
        }
    };

    const validateStep = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        // if (!formData.price.trim()) newErrors.price = 'Price is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        const { name, description, price, category, image } = formData;
        try {
            await updateMenu(
                menuItemId,
                name,
                description,
                price,
                category,
                image,
            );
        } catch (error) {
            console.error('Error creating menu item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Image Preview */}


            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
                    Menu Item Name <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter the name of the menu item. E.g., "Grilled Salmon".</p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
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
                    required
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
                    required
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
                    required
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category}</p>}
            </div>

            <div className="mb-4">
                {imagePreview && (
                    <div className="mb-4">
                        <img src={imagePreview} alt="Menu Item Preview" className="w-1/3 h-auto mb-2 border rounded" />
                    </div>
                )}
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="image">
                    Menu Item Image
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
                {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            {SnackbarComponent}
        </form>
    );
}

export default UpdateMenu;

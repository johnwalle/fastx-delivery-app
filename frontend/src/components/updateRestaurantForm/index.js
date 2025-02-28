import React, { useEffect, useState } from 'react';
import useCreateRestaurant from '../../hooks/useCreateRestaurant';
import AddressForm from '../adressForm';
import authStore from '../../store/auth.store';
import useUpdateRestaurant from '../../admin/hooks/useUpdateRestaurant';
import useRestaurantStore from '../../store/restaurant.store';

function UpdateRestaurantForm({ restaurantId }) {
    const { userData } = authStore();

    const { fetchSingleRestaurant, restaurant } = useRestaurantStore();

    console.log("restaurant dddddddddddddata", restaurant)
    const [formData, setFormData] = useState({
        name: '',
        cuisine_types: [],
        description: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: 'Ethiopia',
        },
        location: {
            latitude: '',
            longitude: '',
        },
        working_days: [],
        phone_number: '',
        image: null,
        operating_hours: {
            open: '',
            close: '',
        },
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    useEffect(() => {
        fetchSingleRestaurant(restaurantId);
    }, [restaurantId]);

    useEffect(() => {
        if (restaurant) {
            setFormData({
                name: restaurant.name,
                cuisine_types: restaurant.cuisine_types,
                description: restaurant.description,
                address: {
                    street: restaurant.address?.street,
                    city: restaurant.address?.city,
                    state: restaurant.address?.state,
                    country: restaurant.address?.country,
                },
                location: {
                    latitude: restaurant.location?.latitude,
                    longitude: restaurant.location?.longitude,
                },
                working_days: restaurant.working_days,
                phone_number: restaurant.phone_number?.slice(4),
                operating_hours: {
                    open: restaurant.operating_hours?.open,
                    close: restaurant.operating_hours?.close,
                },
            });
            if (restaurant.image) {
                setImagePreview(restaurant.image);
            }
        }
    }, [restaurant]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));
        setImagePreview(URL.createObjectURL(file));

        if (errors.image) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '',
            }));
        }
    };

    const handleAddressChange = (addressData) => {
        setFormData((prevState) => ({
            ...prevState,
            address: addressData,
        }));
    };

    const handleLocationChange = (locationData) => {
        setFormData((prevState) => ({
            ...prevState,
            location: locationData,
        }));
    };

    const validateStep = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.location.latitude) newErrors.latitude = 'Latitude is required';
        if (!formData.location.longitude) newErrors.longitude = 'Longitude is required';
        if (!formData.operating_hours.open.trim()) newErrors.open = 'Opening hours are required';
        if (!formData.operating_hours.close.trim()) newErrors.close = 'Closing hours are required';
        if (formData.cuisine_types.length === 0) newErrors.cuisine_types = 'At least one cuisine type is required';
        if (formData.working_days.length === 0) newErrors.working_days = 'Select at least one working day';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    console.log('fffforrrm data', formData);

    const { updateRestaurant, isLoading, SnackbarComponent } = useUpdateRestaurant();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('save change clicked')

        if (!validateStep()) return;

        const fullPhoneNumber = `+251${formData.phone_number}`;

        const { name, cuisine_types, description, address, working_days, operating_hours, location, image } = formData;
        const restaurantID = restaurant._id;


        try {
            await updateRestaurant({
                restaurantID,
                name,
                cuisine_types,
                description,
                address,
                working_days,
                phone_number: fullPhoneNumber,
                operating_hours,
                location,
                image,
            });
        } catch (error) {
            console.error('Error creating restaurant:', error);
        }
    };

    const removeWorkingDay = (dayToRemove) => {
        setFormData((prevState) => ({
            ...prevState,
            working_days: prevState.working_days.filter((day) => day !== dayToRemove),
        }));
    };

    const handleWorkingDaysChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prevState) => ({
            ...prevState,
            working_days: [...new Set([...prevState.working_days, ...selectedOptions])],
        }));

        if (errors.working_days) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                working_days: '',
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
                    Restaurant Name <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Enter the name of your restaurant. E.g., "Sunset Bistro".</p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full text-gray-700  p-2 border ${errors.name ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="cuisine_types">
                    Cuisine Types <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">List the types of cuisine offered, separated by commas. E.g., "Italian, Chinese, Ethiopian".</p>
                <input
                    type="text"
                    name="cuisine_types"
                    id="cuisine_types"
                    value={formData?.cuisine_types?.join(', ')}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            cuisine_types: e.target.value.split(',').map((type) => type.trim()),
                        }))
                    }
                    className={`w-full text-gray-700   p-2 border ${errors.cuisine_types ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.cuisine_types && <p className="text-red-500 text-sm mb-2">{errors.cuisine_types}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="description">
                    Description <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Provide a brief description of the restaurant. E.g., "A cozy place offering a fusion of traditional and modern dishes".</p>
                <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full text-gray-700  p-2 border ${errors.description ? 'border-red-500' : 'border-gray-500'} rounded`}
                    rows="4"

                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}
            </div>

            <AddressForm
                address={formData.address}
                onAddressChange={handleAddressChange}
                location={formData.location}
                onLocationChange={handleLocationChange}
                errors={errors}
            />

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="working_days">
                    Working Days <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Select the days the restaurant operates. E.g., Monday, Wednesday, Friday.</p>
                <select
                    name="working_days"
                    id="working_days"
                    multiple
                    value={formData.working_days}
                    onChange={handleWorkingDaysChange}
                    className={`w-full text-gray-700  cursor-pointer p-2 border ${errors.working_days ? 'border-red-500' : 'border-gray-500'} rounded`}
                >
                    <option className="pb-2" value="Monday">Monday</option>
                    <option className="pb-2" value="Tuesday">Tuesday</option>
                    <option className="pb-2" value="Wednesday">Wednesday</option>
                    <option className="pb-2" value="Thursday">Thursday</option>
                    <option className="pb-2" value="Friday">Friday</option>
                    <option className="pb-2" value="Saturday">Saturday</option>
                    <option className="pb-2" value="Sunday">Sunday</option>
                </select>
                {errors.working_days && <p className="text-red-500 text-sm mb-2">{errors.working_days}</p>}
            </div>
            <div className="mb-4">
                {formData?.working_days?.length > 0 && (
                    <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h4 className="text-lg text-[#A40C0C]  font-semibold mb-2">Selected Working Days</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.working_days.map(day => (
                                <div key={day} className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center ">
                                    {day}
                                    <button
                                        type="button"
                                        onClick={() => removeWorkingDay(day)}
                                        className="text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="phone_number">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Example: "+251 911 123 456"</p>

                <div className="flex items-center">
                    <div className="border border-gray-300 rounded-l-md bg-gray-200 text-center w-20 py-2">+251</div>
                    <input
                        type="tel"
                        id="phone_number" // Updated id to match the name
                        name="phone_number" // Ensure this matches the field name in state
                        value={formData.phone_number} // Ensure this matches the field name in state
                        onChange={handleChange}
                        className={`w-full text-gray-700  p-2 border ${errors.phone_number ? 'border-red-500' : 'border-gray-500'} rounded-r-md`} // Changed border class for consistent styling
                    />
                </div>
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
            </div>

            {/* Image preview */}
            {imagePreview && (
                <div className="mb-4 w-1/3">
                    <img src={imagePreview} alt="Restaurant Preview" className="w-full h-auto rounded-md" />
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="image">
                    Restaurant Image <span className="text-red-500">*</span>
                </label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    className={`w-full cursor-pointer p-2 border ${errors.image ? 'border-red-500' : 'border-gray-500'} rounded`}
                />
                {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image}</p>}
            </div>

            {/* Operating Hours Field */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="operating_hours">
                    Operating Hours <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-2">Specify the opening and closing hours (e.g., 08:00 AM - 10:00 PM).</p>
                <div className="flex gap-4">
                    <input

                        type="time"
                        name="open"
                        value={formData.operating_hours?.open}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                operating_hours: {
                                    ...prevState.operating_hours,
                                    open: e.target.value,
                                },
                            }))
                        }
                        className={`w-full text-gray-600 cursor-pointer md:w-1/4 p-2 border ${errors.open ? 'border-red-500' : 'border-gray-500'} rounded`}
                    />
                    <input
                        type="time"
                        name="close"
                        value={formData.operating_hours?.close}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                operating_hours: {
                                    ...prevState.operating_hours,
                                    close: e.target.value,
                                },
                            }))
                        }
                        className={`w-full text-gray-600 cursor-pointer md:w-1/4 p-2 border ${errors.close ? 'border-red-500' : 'border-gray-500'} rounded`}
                    />
                </div>
                {(errors.open || errors.close) && (
                    <p className="text-red-500 text-sm mb-2">{errors.open || errors.close}</p>
                )}
            </div>

            <button
                type="submit"
                className={`primary transition duration-300 flex items-center justify-center ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white p-2 rounded`}
                disabled={isLoading}
            >
                {isLoading ? 'Saving...' : 'Save Changes'}
            </button>

            {SnackbarComponent}
        </form>
    );
}

export default UpdateRestaurantForm;

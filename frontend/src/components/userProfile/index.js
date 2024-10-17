import React, { useState } from 'react'
import useRegister from '../../hooks/useRegister';

function UserProfile() {
    const { register, error, isLoading, SnackbarComponent } = useRegister();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
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
    const validateStep = () => {
        const newErrors = {};

        // Validation checks for required fields
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!formData.email.includes('@')) newErrors.email = 'Invalid Email';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        // Set errors and return validation status
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep()) return;
        console.log('submitted')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="fullName"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-500'} rounded text-black`}
                />
                {errors.FullName && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="description">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-500'} rounded text-black`}
                    rows="4"
                ></input>
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="price">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mb-7">
                    <div className="border border-gray-300 rounded-l-md bg-gray-200 text-center w-20 py-2 text-black">+251</div>
                    <input
                        type="tel"
                        id="phone"
                        name="phoneNumber" // Fixed the name here
                        onChange={handleChange}
                        value={formData.phoneNumber}
                        className={`w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-500'} rounded text-black`}
                    />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}
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
    )
}

export default UserProfile
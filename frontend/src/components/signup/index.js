import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

function SignupForm() {
    const { register, error, isLoading } = useRegister();

    // State to manage form values
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    // State to manage password match error
    const [passwordError, setPasswordError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that passwords match
        if (formValues.password !== formValues.confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        setPasswordError(''); // Clear previous errors

        try {

            // Concatenate the country code with the phone number
            const fullPhoneNumber = `+251${formValues.phoneNumber}`;

            // Pass the form values to the register function, including the full phone number
            await register(formValues.fullName, formValues.email, fullPhoneNumber, formValues.password);

        } catch (err) {
            // Display any error messages from useRegister
            console.error('Registration error:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='text-white'>Full Name:</label>
                <input
                    type='text'
                    name='fullName'
                    value={formValues.fullName}
                    onChange={handleChange}
                    className='w-full mb-5 mt-2'
                    required
                />

                <label className='text-white'>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    className='w-full mb-5 mt-2'
                    required
                />

                <label htmlFor="phone" className="block mb-2 text-white">Phone Number:</label>
                <div className="flex items-center mb-7">
                    <div className="border border-gray-300 rounded-l-md bg-gray-200 text-center w-20 py-2">+251</div>
                    <input
                        type="tel"
                        id="phone"
                        name="phoneNumber" // Fixed the name here
                        value={formValues.phoneNumber} // Fixed value binding here
                        onChange={handleChange}
                        className="border border-gray-300 rounded-l-[0px] rounded-r-md py-2 px-3 flex-1"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <label className='text-white'>Password:</label>
                <input
                    type='password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    className='w-full mb-5 mt-2'
                    required
                />

                <label className='text-white'>Confirm Password:</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    className='w-full mb-7 mt-2'
                    required
                />
                {passwordError && <p className='text-red-500'>{passwordError}</p>}
                <button type='submit' className='primary w-full' disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='text-white flex gap-2 items-center mt-5 justify-end'>
                    Already a member?<Link to='/login'><button className='secondary'>Sign In</button></Link>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;

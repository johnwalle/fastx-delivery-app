import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

function LoginForm() {
    const { login, error, isLoading } = useLogin();

    // State to manage form values
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

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

        try {
            await login(formValues.email, formValues.password);
            // Handle successful login, e.g., redirect or show a success message
        } catch (err) {
            // Handle login error
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='text-white'>Email</label>
                <input
                    type='email'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    className='w-full mb-5'
                    required
                />

                <label className='text-white'>Password</label>
                <input
                    type='password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    className='w-full mb-10'
                    required
                />

                <button type='submit' className='primary w-full' disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='mt-5 flex flex-col sm:flex-row items-center justify-between'>
                    <Link to='/forgot'>
                        <button className='secondary my-4'>Forgot Password</button>
                    </Link>
                    <div className='text-white flex gap-2 items-center'>
                        Not a member?
                        <Link to='/signup'>
                            <button className='secondary'>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

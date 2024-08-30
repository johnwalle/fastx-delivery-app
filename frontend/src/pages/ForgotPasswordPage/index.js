import React, { useState } from 'react';
import useForgot from '../../hooks/useForgot';  // Import the custom hook
import EmailSent from '../../components/email/email.sent'

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');  // State to manage email input
    const { forgot, isLoading, error, success } = useForgot();  // Destructure values from the custom hook

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            forgot(email);  // Call the forgot function from the hook
        }
    };

    if (success) {
        return <EmailSent />
    }


    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='border border-gray-200 backdrop-blur-sm p-10 flex flex-col items-center gap-5 max-w-lg w-full rounded-lg shadow-lg'> {/* Updated styles */}
                <h3>Forgot  Password</h3>
                <div className='flex flex-col items-center'>
                    <p className='text-sm text-red-200'>Enter your email address and we'll </p>
                    <p className='text-sm text-red-200'>send you a link to reset your password.</p>
                </div>
                {error && <p className='text-red-500 text-center'>{error}</p>}  {/* Display error if present */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
                    <label className='text-white mb-2 w-full'>Email</label>
                    <input
                        type='email'
                        className='w-full mb-5'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  // Update state on input change
                        required
                    />
                    <button
                        type='submit'
                        className={`primary w-full py-2 rounded text-white ${isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}`}
                        disabled={isLoading}  // Disable button while loading
                    >
                        {isLoading ? 'Sending...' : 'Send Email'}  {/* Show loading state */}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage



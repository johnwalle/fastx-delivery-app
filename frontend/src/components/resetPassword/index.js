import { useState } from 'react';
import useReset from '../../hooks/useReset';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { reset, isLoading, error, SnackbarComponent } = useReset();  // Destructure the hook for reset functionality
    const { resetToken } = useParams();  // Correctly retrieve the reset token from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        } else {
            setMessage('');
        }

        try {
            // Call the reset function with the new password and token
            await reset(resetToken, newPassword);
        } catch (err) {
            // Set an error message if something goes wrong
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                {/* Display success or error messages */}
                {message && <p className='text-center mb-4 text-red-500'>{message}</p>}
                {error && <p className='text-center mb-4 text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='py-5'>
                        <button
                            type="submit"
                            className={`w-full primary text-white py-2 rounded transition-colors ${isLoading ? 'cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'} {/* Show loading state */}
                        </button>
                    </div>
                </form>
            </div>
            {SnackbarComponent}
        </div>
    );
};

export default ResetPassword;

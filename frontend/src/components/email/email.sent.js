import React from 'react';

const EmailSent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="border border-[#832923aa] p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    {/* Success Icon */}
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                        {/* Success Icon */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 font-bold text-green-500"
                        >
                            <path
                                d="M20 7L9.00004 18L3.99994 13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl  mb-6 text-green-500">Password Reset Email Sent</h2>
                <p className="text-gray-200 mb-2">Please check your email for a link to reset your password.</p>
                {/* Additional Text for Spam Folder Notice */}
                <p className="text-blue-400 text-sm mt-6">
                    If you don't see the email in your inbox, please check your
                    <span className='text-red-500'> spam or junk folder.</span> 
                </p>
            </div>
        </div>
    );
};

export default EmailSent;

// ErrorCard.js
import React from 'react';

const ErrorCard = ({ message, onClear, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-red-600 text-xl font-bold mb-4">Error</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClear}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorCard;

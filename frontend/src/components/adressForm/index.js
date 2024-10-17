import React from 'react';

const AddressForm = ({ address, onAddressChange, location, onLocationChange, errors }) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg text-[#A40C0C]  font-semibold mb-2">Address</h3>

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="street">
                Street (Optional)
            </label>
            <p className="text-xs text-gray-600 mb-2">Enter the street address of the restaurant (e.g., 123 Main St).</p>
            <input
                type="text"
                name="street"
                id="street"
                value={address.street}
                onChange={(e) => onAddressChange({ ...address, street: e.target.value })}
                className="w-full text-gray-700  px-3 py-2 border rounded-md mb-2 border-gray-300"
            />

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="city">
                City (Optional)
            </label>
            <p className="text-xs text-gray-600 mb-2">Enter the city where the restaurant is located (e.g., Addis Ababa).</p>
            <input
                type="text"
                name="city"
                id="city"
                value={address.city}
                onChange={(e) => onAddressChange({ ...address, city: e.target.value })}
                className="w-full text-gray-700  px-3 py-2 border rounded-md mb-2 border-gray-300"
            />

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="state">
                State (Optional)
            </label>
            <p className="text-xs text-gray-600 mb-2">Enter the state of the restaurant location (e.g., Oromia).</p>
            <input
                type="text"
                name="state"
                id="state"
                value={address.state}
                onChange={(e) => onAddressChange({ ...address, state: e.target.value })}
                className="w-full text-gray-700  px-3 py-2 border rounded-md mb-2 border-gray-300"
            />

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="country">
                Country (Optional)
            </label>
            <p className="text-xs text-gray-600 mb-2">Country is set to Ethiopia and cannot be changed.</p>
            <input
                type="text"
                name="country"
                id="country"
                value={address.country}
                onChange={(e) => onAddressChange({ ...address, country: e.target.value })}
                className="w-full text-gray-700  px-3 py-2 border rounded-md mb-2 border-gray-300"
                disabled
            />

            <h3 className="text-lg text-[#A40C0C]  font-semibold mt-4 mb-2">Location</h3>

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="latitude">
                Latitude <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">Enter the latitude coordinates of the restaurant (e.g., 9.145).</p>
            <input
                type="number"
                name="latitude"
                id="latitude"
                value={location.latitude}
                onChange={(e) => onLocationChange({ ...location, latitude: e.target.value })}
                className={`w-full text-gray-700  px-3 py-2 border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`}
                step="0.000001"
                
            />
            {errors.latitude && <p className="text-red-500 text-sm mb-2">{errors.latitude}</p>}

            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="longitude">
                Longitude <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">Enter the longitude coordinates of the restaurant (e.g., 38.763).</p>
            <input
                type="number"
                name="longitude"
                id="longitude"
                value={location.longitude}
                onChange={(e) => onLocationChange({ ...location, longitude: e.target.value })}
                className={`w-full text-gray-700  px-3 py-2 border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`}
                step="0.000001"
                
            />
            {errors.longitude && <p className="text-red-500 text-sm mb-2">{errors.longitude}</p>}
        </div>
    );
};

export default AddressForm;

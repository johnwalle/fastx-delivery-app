import React from 'react';
import { useParams } from 'react-router-dom';
import burgerbliss from '../../pages/RestaurantDetail/assets/burger-bliss.png'; // Default image
import star from '../../pages/RestaurantDetail/assets/star.png';
import { Mail, MapPin, PhoneOutgoing } from 'lucide-react';
import { IoLocationOutline } from "react-icons/io5";

function Intro({ restaurant }) {

    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number); // Split hours and minutes
        return hours * 60 + minutes;
    };

    // Function to check if the restaurant is currently open
    const isOpen = (openingTime, closingTime) => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes since midnight

        // Convert opening and closing times to minutes since midnight
        const openingMinutes = convertToMinutes(openingTime);
        const closingMinutes = convertToMinutes(closingTime);

        // Check if current time falls between opening and closing times
        return currentTime >= openingMinutes && currentTime <= closingMinutes;
    };

    // Extract opening and closing times from the restaurant data
    const openingTime = restaurant?.operating_hours?.open || '06:00'; // Example default time
    const closingTime = restaurant?.operating_hours?.close || '22:00'; // Example default time

    // Determine if the restaurant is open
    const openStatus = isOpen(openingTime, closingTime);

    // Function to handle View on Map click
    const handleViewOnMapClick = () => {
        // Extract latitude and longitude from the restaurant object, or set default coordinates
        const latitude = restaurant?.location?.latitude || 9.019723; // Default latitude
        const longitude = restaurant?.location?.longitude || 38.766883; // Default longitude

        // Construct the Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Open the URL in a new tab
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div>
            <div className="relative">
                {/* Display restaurant image if available; otherwise, use default image */}
                <img
                    src={restaurant?.image || burgerbliss}
                    alt="banner"
                    width={500}
                    height={100}
                    className="w-full h-[220px] object-cover rounded-xl"
                />

                {/* View on Map text and icon */}
                <div
                    className="absolute top-2 right-2 flex items-center bg-white bg-opacity-75 p-1 rounded-full cursor-pointer"
                    onClick={handleViewOnMapClick}
                >
                    <IoLocationOutline />
                    <span className="text-sm text-gray-700">View on Map</span>
                </div>
            </div>

            <div className="flex md:justify-between flex-col md:flex-row mb-4 md:mb-0 gap-5 md:gap-0">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl md:text-3xl mt-3 font-bold">{restaurant?.name || 'Restaurant Name'}</h2>
                        <div
                            className={`${openStatus ? 'bg-green-500' : 'bg-red-500'} text-sm text-white px-2 py-0 rounded-lg`}
                        >
                            {openStatus ? 'Open' : 'Closed'}
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1 mt-2">
                            <img src={star} alt="star" width={14} height={14} />
                            <label className="text-gray-400">{restaurant?.rating || 0}</label>
                        </div>
                        <div className="flex gap-2">
                            {restaurant?.cuisine_types?.map((cuisine, index) => (
                                <div
                                    key={index}
                                    className="text-sm text-white px-2 py-0 bg-blue-500 rounded-lg"
                                >
                                    {cuisine}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-gray-400 text-sm mt-2 md:w-3/4">{restaurant?.description || 'No description available.'}</div>
                </div>
                <div className="flex flex-col gap-2 items-start md:pt-5 md:pr-8 lg:pt-7 lg:pr-10">
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                        <MapPin color="white" />
                        {restaurant?.address?.street}, {restaurant?.address?.city}, {restaurant?.address?.country}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <PhoneOutgoing color="white" />
                        {restaurant?.phone_number || '+251972204823'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Mail color="white" />
                        {restaurant?.email || 'restaurant@mail.com'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;

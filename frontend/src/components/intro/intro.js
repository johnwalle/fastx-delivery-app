import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import burgerbliss from '../../pages/RestaurantDetail/assets/burger-bliss.png'; // Default image
import star from '../../pages/RestaurantDetail/assets/star.png';
import { Mail, MapPin, PhoneOutgoing } from 'lucide-react';

function Intro({ restaurant }) {



    const convertToMinutes = (time) => {
        const [timePart, period] = time.split(' '); // Split time and am/pm
        const [hours, minutes] = timePart.split(':').map(Number); // Split hours and minutes
        let totalMinutes = hours * 60 + minutes;

        // Adjust hours for pm times, except for 12 pm which is already correct
        if (period.toLowerCase() === 'pm' && hours !== 12) {
            totalMinutes += 12 * 60;
        }
        // Adjust for 12 am (midnight) which should be 0 minutes
        if (period.toLowerCase() === 'am' && hours === 12) {
            totalMinutes = minutes;
        }
        return totalMinutes;
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
    const openingTime = restaurant?.operating_hours?.open || '06:00 am'; // Example default time
    const closingTime = restaurant?.operating_hours?.close || '10:00 pm'; // Example default time

    // Determine if the restaurant is open
    const openStatus = isOpen(openingTime, closingTime);




    return (
        <div>
            <div>
                {/* Display restaurant image if available; otherwise, use default image */}
                <img
                    src={restaurant?.image || burgerbliss}
                    alt="banner"
                    width={500}
                    height={100}
                    className="w-full h-[220px] object-cover rounded-xl"
                />
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

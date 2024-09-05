import React from 'react';
import { Clock } from 'lucide-react';

// Helper function to convert 24-hour time format to 12-hour AM/PM format
const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':').map(Number);

    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Adjust for 12 AM/PM and avoid 0 hours
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Pad minutes with leading zero if needed

    return `${adjustedHours}:${formattedMinutes} ${period}`;
};

function About({ restaurant }) {
    // Extract working days and operating hours from restaurant object
    const { working_days, operating_hours } = restaurant;

    // Convert operating hours to 12-hour format
    const openingTime12Hour = convertTo12HourFormat(operating_hours.open);
    const closingTime12Hour = convertTo12HourFormat(operating_hours.close);

    return (
        <div className="border border-white rounded-lg p-6">
            <div className="grid grid-cols-2 md:gap-4">
                <h2 className="md:text-2xl text-lg font-semibold text-white mb-4">Working Days</h2>
                <h2 className="md:text-2xl text-lg font-semibold text-white mb-4">Operating Hours</h2>
            </div>
            <div className="grid grid-cols-2 gap-1 md:gap-4">
                {/* Mapping through the working days */}
                <div className="md:text-lg text-[15px] font-medium text-white">
                    {working_days.map((day, index) => (
                        <div key={index}>{day}</div>
                    ))}
                </div>

                {/* Displaying operating hours in AM/PM format */}
                <div className="md:text-lg text-[13px] text-white flex items-center gap-2">
                    <Clock className="text-gray-500" />
                    {openingTime12Hour} - {closingTime12Hour}
                </div>
            </div>
        </div>
    );
}

export default About;

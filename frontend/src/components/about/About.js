import React from 'react';
import { Clock } from 'lucide-react';

function About({ restaurant }) {
  // Extract working days and operating hours from restaurant object
  const { working_days, operating_hours } = restaurant;

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

        {/* Displaying operating hours, assuming they are the same for all days */}
        <div className="md:text-lg text-[13px] text-white flex items-center gap-2">
          <Clock className="text-gray-500" />
          {operating_hours.open} - {operating_hours.close}
        </div>
      </div>
    </div>
  );
}

export default About;

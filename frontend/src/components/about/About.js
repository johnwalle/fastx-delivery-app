import React from 'react'
import { Clock } from 'lucide-react';

function About() {
    return (
        <div class="border border-white  rounded-lg p-6">
            <div className='grid grid-cols-2  md:gap-4'>
                <h2 className='md:text-2xl text-lg font-semibold tex-white mb-4'>Working Days</h2>
                <h2 class="md:text-2xl text-lg font-semibold text-white mb-4">Operating Hours</h2>
            </div>
            <div class="grid grid-cols-2 gap-1   md:gap-4">
                <div class="md:text-lg text-[15px] font-medium text-white">Monday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />9:00 AM - 10:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Tuesday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />9:00 AM - 10:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Wednesday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />9:00 AM - 10:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Thursday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />9:00 AM - 10:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Friday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />9:00 AM - 11:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Saturday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />10:00 AM - 11:00 PM</div>

                <div class="md:text-lg text-[15px] font-medium text-white">Sunday</div>
                <div class="md:text-lg text-[15px] text-white flex items-center gap-2"><Clock className='text-gray-500' />10:00 AM - 8:00 PM</div>
            </div>
        </div>

    )
}

export default About
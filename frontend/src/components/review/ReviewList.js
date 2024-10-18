import React from 'react'
import userprofile from '../../pages/RestaurantDetail/assets/user-profile.png'
import { Rating } from '@mui/material'

function ReviewList({ reviews }) {

    // Function to format ISO date string to desired format
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);

        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
    }

    return (
        <div className='flex flex-col gap-5 my-3 mr-3'>
            {!reviews ?
                [0, 1, 2].map((item, index) => (
                    <div key={index} className='h-[100px] w-full border rounded-lg bg-slate-200 animate-pulse'>
                    </div>
                )) :
                reviews.map((review, index) => (
                    <div key={index} className='flex gap-5 items-center rounded-lg border p-5'>
                        <img src={`https://ui-avatars.com/api/?name=${review.userFullName}&background=random&size=50&bold=true`}
                            alt='Profile Image'
                            width={50}
                            height={50}
                            className='rounded-full' />
                        <div>
                            <div className='md:text-lg text-sm text-black'>{review.comment}</div>
                            <Rating orientation='horizontal' style={{ maxWidth: 50 }}
                                value={review.rating}
                                readOnly />
                            <div className='text-sm'>
                                <span className='font-bold'>{review.userFullName}</span> at {formatDate(review.updatedAt)}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ReviewList

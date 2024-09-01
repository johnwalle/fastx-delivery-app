import React from 'react'
import userprofile from '../../pages/RestaurantDetail/assets/user-profile.png'
import { Rating } from '@mui/material'


function ReviewList({ reviewList }) {

    return (
        <div className='flex flex-col gap-5 my-3 mr-3'>
            {!reviewList ?
                [0, 1, 2, 3].map((item, index) => (
                    <div key={index} className='h-[100px] w-full border rounded-lg bg-slate-200 animate-pulse'>
                    </div>
                )) :
                reviewList.map((review, index) => (
                    <div key={index} className='flex gap-5 items-center rounded-lg border p-5'>
                        <img src={userprofile}
                            alt='Profile Image'
                            width={50}
                            height={50}
                            className='rounded-full' />
                        <div>
                            <div className='md:text-lg text-sm text-black'>{review.text}</div>
                            <Rating orientation='horizontal' style={{ maxWidth: 50 }}
                                value={review.rating}
                                isDisabled={true} />
                            <div className='text-sm'><span className='font-bold'>{review.username}</span> at {'02-Mar-2024'}</div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ReviewList
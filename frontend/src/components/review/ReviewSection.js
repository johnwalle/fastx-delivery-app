import React, { useState } from 'react'
import ReviewList from './ReviewList';
import { Rating, TextareaAutosize } from '@mui/material';

function ReviewSection() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState();
    const reviewList = [
        {
            username: "foodie123",
            rating: 5,
            text: "The food was absolutely amazing! The flavors were spot on, and the service was top-notch. Will definitely come back again!"
        },
        {
            username: "travel_guru",
            rating: 4,
            text: "Great atmosphere and delicious food. The portion sizes could be a bit larger, but overall a wonderful experience."
        },
        {
            username: "veggieLover",
            rating: 4.5,
            text: "Loved the vegetarian options! Fresh ingredients and well-prepared dishes. The ambiance was cozy and inviting."
        },
        {
            username: "sushiFanatic",
            rating: 3.5,
            text: "The sushi was good, but I've had better elsewhere. The service was a bit slow, but the staff was friendly."
        },
        {
            username: "bbqMaster",
            rating: 5,
            text: "The BBQ here is phenomenal! Juicy, tender, and full of flavor. This is now my go-to spot for BBQ."
        },
        {
            username: "foodCritic99",
            rating: 2.5,
            text: "I was disappointed with the quality of the food. It was bland and lacked seasoning. The service was decent though."
        },
        {
            username: "chefInTraining",
            rating: 4.8,
            text: "As someone who cooks a lot at home, I was really impressed with the creativity and execution of the dishes here."
        },
        {
            username: "sweetTooth",
            rating: 4.2,
            text: "The desserts were to die for! So rich and flavorful. The main course was good too, but the desserts stole the show."
        },
        {
            username: "casualDiner",
            rating: 3,
            text: "It was an okay experience. The food was decent, but nothing to write home about. The service was a bit slow."
        },
        {
            username: "gourmetGuy",
            rating: 4.9,
            text: "Everything was perfect! The food, the service, the ambiance. A true gourmet experience. Highly recommended!"
        }
    ];

    const handleSubmit = () => {
        console.log('Review Submitted');
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 bg-white rounded-lg'>
            <div className='p-5 shadow-lg border rounded-xl'>
                <h2 className='font-medium text-lg text-black'>Add your review</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-start'>
                    <Rating style={{ borderColor: 'white' }} name="simple-controlled"
                        value={rating} onChange={(e, newValue) => setRating(newValue)} className="mt-5 mb-2" />
                    {/* <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} /> */}
                    < TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" className='w-full' />
                    <button disabled={rating == 0 || reviewText == ''}
                        className="mt-3 text-white primary"
                        type='submit'
                    >Submit</button>
                </form>
            </div>
            <div className='col-span-2'>
                <ReviewList reviewList={reviewList} />
            </div>
        </div>
    )
}

export default ReviewSection
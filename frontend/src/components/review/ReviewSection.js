import React, { useEffect, useState } from 'react'
import ReviewList from './ReviewList';
import { Rating, TextareaAutosize } from '@mui/material';
import { useParams } from 'react-router-dom';
import useReviewStore from '../../store/review.store';


function ReviewSection() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState();
    const { restID } = useParams();
    const { addReview, fetchReviews, reviews } = useReviewStore((state) => ({
        addReview: state.addReview,
        fetchReviews: state.fetchReviews,
        reviews: state.reviews,
    }));


    useEffect(() => {
        fetchReviews(restID);
    }, [restID, fetchReviews]);




    const handleSubmit = () => {
        console.log('Review Submitted');
        console.log('Rating:', rating, 'Review:', reviewText);
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 bg-white rounded-lg'>
            <div className='p-5 shadow-lg border rounded-xl'>
                <h2 className='font-medium text-lg text-black'>Add your review</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-start'>
                    <Rating style={{ borderColor: 'white' }} name="simple-controlled"
                        value={rating} onChange={(e, newValue) => setRating(newValue)} className="mt-5 mb-2" />
                    {/* <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} /> */}
                    < TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" className='w-full'  onChange={(e) => setReviewText(e.target.value)}/>
                    <button disabled={rating == 0 || reviewText == ''}
                        className="mt-3 text-white primary"
                        type='submit'
                    >Submit</button>
                </form>
            </div>
            <div className='col-span-2'>
                <ReviewList reviews={reviews} />
            </div>
        </div>
    )
}

export default ReviewSection
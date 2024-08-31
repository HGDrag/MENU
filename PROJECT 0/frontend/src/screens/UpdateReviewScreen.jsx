import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateUserReviewMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setReviews } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'
import Loader from '../components/Loader';


const UpdateReviewScreen = () => {
    const { id } = useParams();
    console.log(`Here is the id from the parameters: ${id}`)
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth)
    const found = userInfo.reviews.find(review => review._id === id);
    const [update, {isLoading}] = useUpdateUserReviewMutation();

    useEffect(() => {
        setReview(found.review);
        setRating(found.rating);
    }, [found]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (rating < 1 || rating > 5) {
            toast.error('Your minimum rating must be 1 star')
        } else {
            try{
                const res = await update({
                    _id: id,
                    review,
                    rating
                }).unwrap();
                console.log(res)
                try {
                    dispatch(setReviews(res))
                    navigate('/profile')
                } catch (error) {
                    console.log(error)
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
      <FormContainer>
        <Form onSubmit={submitHandler}>
        <h1>Update Your Review</h1>
        <hr className='w-25 mb-3'/>
        <Form.Group className='my-2' controlId='review'>
            <Form.Label className='my-2'>Review:</Form.Label>
            <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter Your Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <>
            {[...Array(5)].map((star, i) => {
                const starRating = i + 1
             return <Form.Label key={i} className='my-3'>
                <Form.Check
                    className='d-none' 
                    type='radio' 
                    name='rating' 
                    value={starRating} 
                    onChange={(e) => {setRating(starRating) }}
                    />
                <FaStar 
                    size={40} 
                    color={starRating <= (hover || rating) ? 'gold' : 'grey'}
                    onMouseEnter={() => setHover(starRating)}
                    onMouseLeave={() => setHover(null)}
                />
            </Form.Label>
            
            })}
            </>
        </Form.Group>
        {isLoading && <Loader />}
        <>
        <Button type='submit' variant='primary' className='mt-3 me-2'>
            Update Now
        </Button>
        <Link to='/products' className='btn btn-danger mt-3'>Cancel</Link>
        </>
        </Form>
    </FormContainer>
    
  )
}

export default UpdateReviewScreen
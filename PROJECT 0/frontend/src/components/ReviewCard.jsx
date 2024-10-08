import React from 'react'
import Card from 'react-bootstrap/Card'
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { setReviews } from '../slices/authSlice';
import { useDeleteUserReviewMutation, useGetUserReviewsMutation } from '../slices/usersApiSlice';
const ReviewCard = ({ review }) => {
    const dispatch = useDispatch();

    const [deleteReview] = useDeleteUserReviewMutation()

    const deleteHandler = async (e) => {
        e.preventDefault();
        console.log("Deleting review with ID:", review._id);
        if (review)
            try {
                const res = await deleteReview(review._id).unwrap();
                console.log(res)
                try{
                    dispatch(setReviews(res))
                }   catch ( error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
    }


    return (
        <Col xs={12} className='my-3'>
            <Card className='shadow border-0'>
                <Card.Body>
                    <Card.Text>
                        {review.review}
                    </Card.Text>
                    <Card.Title>{review.user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.rating}</Card.Subtitle>
                    <Link to={`/profile/reviews/review/${review._id}`} className='btn btn-success me-3'>Update</Link>
                    <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ReviewCard
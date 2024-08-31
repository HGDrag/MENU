import React from 'react'
import Card from 'react-bootstrap/Card'
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setReviews } from '../slices/authSlice';
import { useDeleteUserReviewMutation } from '../slices/usersApiSlice';
const ReviewCard = ({ review }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // console.log(userInfo)
    const [deleteReview] = useDeleteUserReviewMutation()

    const deleteHandler = async (e) => {
        console.log("Deleting review with ID:", review._id);
        if (review)
            try {
                const res = await deleteReview(review._id).unwrap();
                dispatch(setReviews(res))
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
                    <Link to={`/reviews/review/${review._id}`} className='btn btn-success me-3'>Update</Link>
                    <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ReviewCard
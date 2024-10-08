import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useGetUserReviewsMutation, useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import ReviewsContainer from '../components/ReviewsContainer';
import ReviewCard from '../components/ReviewCard';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const [getUserReviews, { data: reviews, refetch }] = useGetUserReviewsMutation();


    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        getUserReviews();
    }, [userInfo.setName, userInfo.setEmail, getUserReviews]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passowrds do not match')
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated');
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <>
            <FormContainer>
                <h1>Update Profile</h1>

                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Confrim Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {isLoading && <Loader />}
                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>
                </Form>
            </FormContainer>

            <Row className='mb-5'>
                <Col xs={10} className='m-auto'>
                    <h2 className='my-3 text-center'>Your Reviews</h2>
                    <hr className='w-25 text-info m-auto my-5' />
                    <ReviewsContainer>
                        {/* {reviews?.map((review) => (
                            <ReviewCard key={review.id} review={review} refetchReviews={refetch} />
                        ))} */}
                        {/* {userInfo.reviews.map(review => {
                            console.log(review)
                        })} */}
                            {
                                isLoading ? (
                                    <Loader />
                                ) : (
                                    userInfo.reviews.map((review) => (
                                        <ReviewCard review={review} key={review._id} />
                                    ))
                                )
                            }
                    </ReviewsContainer>
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
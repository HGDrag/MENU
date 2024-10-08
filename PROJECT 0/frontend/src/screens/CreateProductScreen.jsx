import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useAllProductsMutation, useCreateMutation } from '../slices/productsApiSlice';
import { setCredentials } from '../slices/authSlice';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //refetch the data
    const fetchAll = useAllProductsMutation();
    const { productInfo } = useSelector((state) => state.product);
    
    const [create, { isLoading }] = useCreateMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (name === '' && price === '' && type === '') {
            toast.error('Please fill all fields!')
        }else{
            try {
                const res = await create({name, price, type}).unwrap();
                dispatch(setCredentials([...res]));
                fetchAll.refetch();
                navigate('/products');
            } catch (err) {
                // toast.error(err.data.message || err.error);
                console.log(err)
                navigate('/products');
            }
        }
    }

    return (
        <FormContainer>
            <h1>Create Product</h1>

            <Form onSubmit={ submitHandler }>
            <Form.Group className='my-2' controlId='name'> 
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder="Enter Name"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='price'> 
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        required
                        type='number'
                        placeholder="Enter Price"
                        value={price}
                        onChange={ (e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='type'> 
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder="Enter Type"
                        value={type}
                        onChange={ (e) => setType(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader/>}
                <Button type='submit' variant='primary' className='mt-3'>
                    Create Now
                </Button>

                <Row className='py-3'>
                    <Col>
                        You want to leave a review? <Link to='/login'>Log In Now</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default CreateProductScreen
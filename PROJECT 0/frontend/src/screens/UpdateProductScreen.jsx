import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useUpdateMutation } from '../slices/productsApiSlice';
import { setCredentials } from '../slices/productSlice';
import { React, useEffect } from 'react';

const UpdateProductScreen = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { productInfo } = useSelector((state) => state.product);
    const found = productInfo.find(product => product._id === id)
    const [update, { isLoading }] = useUpdateMutation();
    
    useEffect(()=> {
        if (found) {
            setName(found.name);
            setPrice(found.price);
            setType(found.type);
        }
    }, [found.name, found.price, found.type])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (name === '' || price === '' || type === '') {
            toast.error('Please fill all fields!')
            console.error(err.error);
        } else {
            try {
                const res = await update({
                    _id: id,
                    name, 
                    price, 
                    type 
                }).unwrap();
                try {
                    dispatch(setCredentials(...res));
                } catch (dispatchError) {
                    console.error('Dispatch error:', dispatchError);
                }
                navigate('/products');
                toast.success('Product Updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Update Product</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)
                        }
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='type'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder="Enter Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type='submit' variant='primary' className='mt-3'>
                    Update Now
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

export default UpdateProductScreen;
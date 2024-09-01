import { useState, React } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { FaStar } from 'react-icons/fa'
import { useCreateProductReviewMutation } from '../slices/productsApiSlice';


const CreateReviewScreen = () => {
    const { productId } = useParams();
    console.log(productId)
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productInfo } = useSelector((state) => state.product)
    const product = productInfo.find(product => product._id === productId)
    console.log(product)
    const reviews = product.reviews
    console.log(reviews)

    const [addReview] = useCreateProductReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!productId) {
            console.error('Product ID is missing');
            return;
        }
        try {
            const res = await addReview({ review, rating, productId }).unwrap();
            console.log('Response:', res);
            navigate('/products')
        } catch (error) {
            console.error('Error:', error); // Add error logging
        }
    };


    return (
        <FormContainer>
            <h1>Leave A Review</h1>
            <h2 className='text-muted text-capitalize'>{product.name}</h2>
            <Form onSubmit={submitHandler} >
                <hr className='w-25 mb-3' />
                <Form.Group className='my-2' controlId='review'>
                    <Form.Label className='my-2'>Review:</Form.Label>
                    <Form.Control
                        rows={4}
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
                                    onChange={(e) => { setRating(starRating) }}
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
                {/* {isLoading && <Loader />} */}
                <>
                    <Button type='submit' variant='success' className='mt-3 me-2'>
                        Submit
                    </Button>
                    <Link to='/products' className='btn btn-danger mt-3'>Cancel</Link>
                </>
            </Form>
        </FormContainer>
    )


}



export default CreateReviewScreen
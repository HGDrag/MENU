import Card from 'react-bootstrap/Card'
import { useState, React } from 'react';
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDeleteMutation, useDeleteProductReviewMutation } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setProductReviews } from '../slices/productSlice';
import { FaStar } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ProductCard = ({ product }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let isAdmin = false;

    if (userInfo && userInfo.role === 'Admin') {
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    const [deleteProduct] = useDeleteMutation();

    const deleteHandler = async (e) => {
        console.log("Deleting product with ID:", product._id);
        if (product)
            try {
                const res = await deleteProduct(product._id).unwrap();
                console.log(res)
                dispatch(setCredentials([...res]));
            } catch (error) {
                console.log(error)
            }
    }

    const [deleteProductReview] = useDeleteProductReviewMutation();

    const deleteReviewHandler = async (e) => {
        e.preventDefault();
    
        // Access the reviewId from the data attribute
        const reviewId = e.target.getAttribute('data-review-id');
        const productId = product.id; // Assuming you have access to the product ID
    
        // Log the reviewId to confirm it's being accessed
        console.log('Review ID:', reviewId);
    
        // Call the mutation to delete the review
        try {
           const res = await deleteProductReview({ productId, reviewId });
            console.log('Review deleted:', reviewId);
    
            dispatch(setProductReviews([...res]));
     
            // Update the state with the remaining reviews
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <>
            <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='p-1 '>
                <Card className='shadow border-0'>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">{product.type}</Card.Subtitle>
                        <Card.Text className='my-2'>
                            Price: ${product.price}
                        </Card.Text>
                        <Card.Text >
                            <div className='d-flex align-items-center flex-wrap'>
                                <div className='stars me-3'>
                                    {[...Array(5)].map((star, i) => {
                                        const starRating = i + 1
                                        return <FaStar
                                            key={i}
                                            size={25}
                                            color={starRating <= (product.avarageRating) ? 'gold' : 'grey'}
                                        />

                                    })}
                                </div>
                                Avg: {product.avarageRating} <Link className='mx-2' onClick={handleOpen}> {product.reviewCount} Reviews</Link>
                            </div>
                        </Card.Text>
                        {isAdmin ? (
                            <>
                                <Link to={`/products/product/${product._id}/update`} className='btn btn-success me-3'>Update</Link>
                                <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                            </>
                        ) : (
                            <>

                            </>
                        )}

                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show} onHide={handleClose} scrollable size='lg' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{product.name} - Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {product.reviews.map(review => {
                        return (
                            <Col key={review._id} xs={12} className='shadow-lg mb-4 mt-3 p-3'>

                                <em>{review.review}</em>
                                <div className='mt-3 d-flex flex-wrap align-items-center justify-content-between'>
                                    <div className='user-info flex-wrap d-flex align-items-center gap-2 '>
                                        <p className='p-0 m-0 text-muted text-capitalize'>{review.user.name}</p>
                                        <div>
                                        {[...Array(5)].map((star, i) => {
                                            const starRating = i + 1
                                            return <FaStar
                                            size={25}
                                            key={i}
                                            color={starRating <= (review.rating) ? 'gold' : 'grey'}
                                            />
                                            
                                        })}
                                        </div>
                                    </div>
                                    {isAdmin ? (
                                        <>
                                            <Link onClick={deleteReviewHandler} className='my-2 btn btn-danger' data-review-id={review._id}>Delete</Link>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}

                                </div>
                            </Col>
                        )

                    })}
                </Modal.Body>
                <Modal.Footer>
                <p>Want to say something good about this product?</p><Link to={`/products/product/${product._id}/leave-a-review`} className=''>Leave A Review Now!</Link>

                    
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ProductCard
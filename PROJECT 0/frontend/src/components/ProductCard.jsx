import React from 'react'
import Card from 'react-bootstrap/Card'
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDeleteMutation } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/productSlice';

const ProductCard = ({ product }) => {
    const {userInfo} = useSelector((state) => state.auth);
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
        if(product)
            try {
                const res = await deleteProduct(product._id).unwrap();
                console.log(res)
                dispatch(setCredentials([...res]));
            } catch (error) {
                console.log(error)
            }
        }        
    
    
    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='p-1 '>
            <Card className='shadow border-0'>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.type}</Card.Subtitle>
                    <Card.Text>
                        Price: ${product.price}
                    </Card.Text>
                    {isAdmin ? (
                        <>
                            <Link to={`/products/product/${product._id}/update`} className='btn btn-success me-3'>Update</Link>
                            <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                        </>
                    ): (
                        <></>
                    )}
                    {/* <Link to={`/products/product/${product._id}/update`} className='btn btn-success me-3'>Update</Link>
                    <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link> */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
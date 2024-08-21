import React from 'react'
import Card from 'react-bootstrap/Card'
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDeleteMutation } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/productSlice';

const ProductCard = ({ product }) => {
    
    const dispatch = useDispatch();

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
        <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className='p-1'>
            <Card >
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.type}</Card.Subtitle>
                    <Card.Text>
                        Price: ${product.price}
                    </Card.Text>
                    <Link to={`/products/product/${product._id}/update`} className='btn btn-success me-3'>Update</Link>
                    <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
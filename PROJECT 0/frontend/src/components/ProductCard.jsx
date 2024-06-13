import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link} from 'react-router-dom';
import { useDeleteMutation } from '../slices/productsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeCredentials } from '../slices/productSlice';

const ProductCard = ({ product }) => {
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [deleteProduct] = useDeleteMutation();

    const deleteHandler = async (e) => {
        console.log("Deleting product with ID:", product._id);
        if(product)
            try {
                await deleteProduct(product._id);
                // dispatch(removeCredentials({...product._id})).unwrap();
            } catch (error) {
                console.log(error)
            }
        }        
    

    return (
            <Card className='col-sm-3 mx-3' >
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.type}</Card.Subtitle>
                    <Card.Text>
                        Price: ${product.price}
                    </Card.Text>
                    <Link to='/update' className='btn btn-success me-3'>Update</Link>
                    <Link onClick={deleteHandler} className='btn btn-danger'>Delete</Link>
                </Card.Body>
            </Card>
    )
}

export default ProductCard
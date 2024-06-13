import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link} from 'react-router-dom';


const ProductCard = ({ product }) => {
    return (
            <Card className='col-sm-3 offset-1 my-3 justify-content-center' >
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.type}</Card.Subtitle>
                    <Card.Text>
                        Price: ${product.price}
                    </Card.Text>
                    <Link to='/update' className='btn btn-success me-3'>Update</Link>
                    <Link to='/delete' className='btn btn-danger'>Delete</Link>
                </Card.Body>
            </Card>
    )
}

export default ProductCard
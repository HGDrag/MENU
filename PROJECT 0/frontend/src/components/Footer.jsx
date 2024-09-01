import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';

const Footer = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // destroys cookie
            dispatch(logout()); // clears local storage
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <footer className="bg-dark text-white pt-5 pb-3 border border-end-0 border-bottom-0 border-start-0 border-top-1 border-info">
            <Container>
                <Row>
                    <Col md="4">
                        <h5>Contact Us</h5>
                        <p>Phone: +1 234 567 890</p>
                        <p>Location: 1234 Example St, City, Country</p>
                    </Col>
                    <Col md="4">
                        <h5>About Us</h5>
                        <p>We are one of the fastest growing projects ever created.</p>
                    </Col>
                    <Col md="4">
                        <h5>Pages You Might Want To See</h5>
                        <Link to='/' className='d-block my-2'>Home</Link>
                        <Link to='/products' className='d-block my-2'>Our Products</Link>
                        {userInfo ? (
                            <>
                                <Link to='/profile' className='d-block my-2'>Profile</Link>
                                <Link onClick={logoutHandler} className='d-block my-2'>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/register' className='d-block my-2'>Sign Up</Link>
                                <Link to='/login' className='d-block my-2'>Sign In</Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
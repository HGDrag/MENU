import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaList, FaUser, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const isAdmin = userInfo && userInfo.role === 'Admin';
    
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
        <header className='shadow-lg'>
            <Navbar bg="dark" data-bs-theme='dark'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='fs-2 text-info'>BEFED</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' />
                    <Nav className='ms-auto'>
                        {userInfo ? (
                            <>
                                <LinkContainer to='/products'>
                                    <Nav.Link className='d-flex align-items-center gap-2 text-info'>
                                        <FaList />Our Products
                                    </Nav.Link>
                                </LinkContainer>
                                {isAdmin ? (

                                    <LinkContainer to='/create'>
                                    <Nav.Link className='d-flex align-items-center gap-2 text-info'>
                                        <FaPlus/> Create Product
                                    </Nav.Link>
                                </LinkContainer>
                                ): (
                                    <></>
                                )}
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item className=' d-flex align-items-center gap-2 '>
                                            <FaUser /> Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler} className='d-flex align-items-center gap-2'>
                                        <FaSignOutAlt />   Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </>
                        ) : (
                            <>
                                <LinkContainer to='/products'>
                                    <Nav.Link className='d-flex align-items-center gap-2 text-info'>
                                        <FaList />Our Products
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/login'>
                                    <Nav.Link className='d-flex align-items-center gap-2 text-info'>
                                        <FaSignInAlt /> Sing In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Nav.Link href='/register' className='d-flex align-items-center gap-2 text-info'>
                                        <FaSignOutAlt /> Sign Up
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
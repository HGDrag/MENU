import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import {FaSignInAlt, FaSignOutAlt, FaProductHunt} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const header = () => {

    const {userInfo} = useSelector((state) => state.auth);
    
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
    <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>BE FED</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' />
                    <Nav className='ms-auto'>
                        { userInfo ? (
                            <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/create'>
                                        <NavDropdown.Item>
                                            Create Product
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </>
                        ): (
                            <>
                            <LinkContainer to='/create'>
                                <Nav.Link>
                                <FaProductHunt className='mx-1'/>Create Product
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaSignInAlt /> Sing In
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Nav.Link>
                                    <FaSignOutAlt /> Sign Up
                                </Nav.Link>
                            </LinkContainer>
                            </>
                        ) }
                    </Nav>
                </Container>
            </Navbar>
        </header>
  )
}

export default header
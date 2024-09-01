import React from 'react';
import { Container, Carousel, Button } from 'react-bootstrap';
import heroImage from '../assets/images/heroImage.jpg'
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className="d-flex align-items-center" style={{ height: '100vh', backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container className="text-left text-light fluid">
        <h1 className="display-4 fw-medium mt-5">Welcome to <span className='text-info fw-semibold'>BEFED</span></h1>
        <hr  className='w-25 text-info'/>
        <p className="lead fs-3 fw-normal">One of the fastest growing fast food/coffe projects
          <span className='d-block'>ever existed on the market.</span> </p>
        <Link to='/products'  className='mt-4 btn btn-info fs-5 text-uppercase'>See Our Products</Link>
      </Container>
    </div>
  );
};

export default Hero
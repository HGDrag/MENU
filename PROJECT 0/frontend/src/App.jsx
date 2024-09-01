import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';


const App = () => {
  
  return (
    <>
      <Header />
      <ToastContainer />
      <Container fluid className='m-0 p-0'>
        <Outlet />
      </Container>
      <Footer/>
    </>
  );
}

export default App
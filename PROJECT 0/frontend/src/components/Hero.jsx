import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAllProductsMutation } from '../slices/productsApiSlice';
import productSlice, { setCredentials } from '../slices/productSlice';
import { useGetProductsQuery } from '../slices/apiSlice';


const Hero = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const [allProducts, { isLoading }] = useAllProductsMutation();

  const { productInfo} = useSelector((state) => state.product);

  const dataHandler = async (e) => {
    // e.preventDefault();
    try {
      const res = await allProducts().unwrap()
      dispatch(setCredentials([...res]));
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      dataHandler()
      console.log(productInfo)
}, []);

  // useEffect(() => {
  //   dataHandler().then(() => {
  //     try {
  //       dispatch(allProducts).unwrap().then((data) => data.map((product) => {
  //         setName(product.name)
  //         setPrice(product.price)
  //         console.log(productInfo)
  //       }))
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })
  // }, []);

  
  return (
    <div>
      {productInfo.map((product) => (
        <h1 key={product._id}>{product.name}</h1>
      ))}
    </div>
    // IF BUTTONS ARE NEEDED OR SOMEKIND OF LINKS -> IMPORT LinkComponent FROM REACT ROUTER BOOTSTRAP
  )
}

export default Hero
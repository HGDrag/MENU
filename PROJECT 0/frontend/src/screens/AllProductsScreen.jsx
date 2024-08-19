import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAllProductsMutation } from '../slices/productsApiSlice';
import productSlice, { setCredentials } from '../slices/productSlice';
import { useGetProductsQuery } from '../slices/apiSlice';
import ProductCard from '../components/ProductCard';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProductsContainer from '../components/ProductsContainer'
import Loader from '../components/Loader';

const AllProductsScreen = () => {

    const dispatch = useDispatch();

    const [allProducts, { isLoading }] = useAllProductsMutation();

    const { productInfo } = useSelector((state) => state.product);

    const dataHandler = async (e) => {
        try {
            const res = await allProducts().unwrap()
            dispatch(setCredentials([...res]));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        dataHandler()
    }, []);
    return (
            <ProductsContainer>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    productInfo.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))
                )
            }
            </ProductsContainer>
    )
}

export default AllProductsScreen
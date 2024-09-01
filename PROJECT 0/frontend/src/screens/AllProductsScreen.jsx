import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAllProductsMutation } from '../slices/productsApiSlice';
import { setCredentials } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';
import ProductsContainer from '../components/ProductsContainer';
import Loader from '../components/Loader';
import { Button } from 'react-bootstrap';

const AllProductsScreen = () => {
    const { productInfo } = useSelector((state) => state.product);
    
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(productInfo);

    let filters = [];
    let types = [...new Set(productInfo.map(product => product.type))];
    filters.push(types);

    const dispatch = useDispatch();
    const [allProducts, { isLoading }] = useAllProductsMutation();

    const handleFilterButtonClick = (selectedType) => {
        if (selectedFilters.includes(selectedType)) {
            let filters = selectedFilters.filter((el) => el !== selectedType);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedType]);
        }
    };

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempProducts = selectedFilters.map((selectedType) => {
                let temp = productInfo.filter((product) => product.type === selectedType);
                return temp;
            });
            setFilteredProducts(tempProducts.flat());
        } else {
            setFilteredProducts([...productInfo]);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters, productInfo]);

    const dataHandler = async () => {
        try {
            const res = await allProducts().unwrap();
            // Assuming res contains the updated product list
            dispatch(setCredentials(res));
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        dataHandler();
    }, []);

    return (
        <>
            <h1 className='text-center mt-5 mb-3'>Our Products</h1>
            <hr className='w-25 m-auto text-info'/>
            <div className='mt-5 d-flex flex-wrap justify-content-center gap-2 align-items-center'>
                <p className='p-0 my-0 me-3 text-info fs-5'>Filters:</p>
                {filters[0].map((type, idx) => (
                    <Button
                        variant='outline-light'
                        onClick={() => handleFilterButtonClick(type)}
                        className={`button ${selectedFilters?.includes(type) ? "active" : ""}`}
                        key={`filters-${idx}`}
                        >
                        {type}
                    </Button>
                ))}
            </div>
            <ProductsContainer>
                {filteredProducts.map((product, idx) => (
                    <ProductCard product={product} key={`products-${idx}`} />
                ))}
            </ProductsContainer>
        </>
    );
};

export default AllProductsScreen;

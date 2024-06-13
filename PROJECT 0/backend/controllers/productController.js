import asyncHandler from 'express-async-handler';
import Product from '../models/prouductModel.js';
// @desc GET ALL PRODUCTS
// route GET /api/products/all
// @access public
const getAllProducts = asyncHandler(async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
});

// @desc CREATE PRODUCT
// route POST /api/products
// @access private
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, type } = req.body;
    const productExists = await Product.findOne({ name });

    if(productExists) {
        res.status(400);
        throw new Error('Product already exists');
    }

    const product = await Product.create({ name, price, type });
    
    if(product) {
        res.status(201).json({
            _id: product._id,
            name: product.name,
            price: product.price,
            type: product.type
        });
    } else {
        res.status(400);
        throw new Error('Invalid product data');
    }
});

// @desc GET PRODUCT
// route POST /api/products/product
// @access public
const getProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById( req.params.id );
        res.status(200).json(product);

    } catch(error) {
        res.status(500)
        throw new Error('Something went wrong!');
    }

});

// @desc DELETE PRODUCT
// route POST /api/products/delete
// @access protected
const deleteProduct = asyncHandler(async (req, res) => {

    try {
        const deleted = await Product.deleteOne(Product._id);
        
        res.status(200).json({message: 'Product deleted'})

    } catch (error) {
        throw new Error(error);
    }
});


export {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct
}
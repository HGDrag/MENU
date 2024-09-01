import asyncHandler from 'express-async-handler';
import Product from '../models/prouductModel.js';
// @desc GET ALL PRODUCTS
// route GET /api/products/all
// @access public
const getAllProducts = asyncHandler(async (req, res) => {
    const product = await Product.find().populate('reviews');
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
        const product = await Product.findById( req.params.id ).populate('reviews');
        if(product){
            res.status(200).json(product);
        } else{
            res.status(404).json({message: 'Product Not Found'})
        }
    } catch(error) {
        res.status(500)
        throw new Error('Something went wrong!');
    }

});

// @desc DELETE PRODUCT
// route POST /api/products/product:id/delete
// @access public
const deleteProduct = asyncHandler(async (req, res) => {

    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        console.log(product)
        if (product) {
            await Product.deleteOne({ _id: product._id });
            getAllProducts(req, res);
            
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


// @desc UPDATE PRODUCT INFO
// route PUT /api/products/product:id/update
// @access public
const updateProductInfo = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.type = req.body.type || product.type;

        const updatedProduct = await product.save();
        
        getAllProducts(req, res);
        
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProductInfo
}
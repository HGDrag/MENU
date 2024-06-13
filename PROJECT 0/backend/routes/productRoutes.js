import express from 'express';
import { createProduct, getAllProducts, getProduct, deleteProduct, updateProductInfo } from '../controllers/productController.js';
const router = express.Router();

router.get('/all', getAllProducts);
router.post('/', createProduct);
router.get('/product/:id', getProduct);
router.post('/product/:id/delete', deleteProduct);
router.put('/product/:id/update', updateProductInfo);

export default router;
import express from 'express';
import { createProduct, getAllProducts, getProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/all', getAllProducts);
router.get('/product/:id', getProduct);
router.post('/', createProduct);
router.post('/deleted', deleteProduct);

export default router;
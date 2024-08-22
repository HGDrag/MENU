import express from 'express';
import { createProduct, getAllProducts, getProduct, deleteProduct, updateProductInfo } from '../controllers/productController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/all', getAllProducts);
router.get('/product/:id', getProduct);
router.post('/', protect, checkRole, createProduct);
router.delete('/product/:id/delete', protect, checkRole, deleteProduct);
router.put('/product/:id/update', protect, checkRole, updateProductInfo);

export default router;
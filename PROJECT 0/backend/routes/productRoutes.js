import express from 'express';
import { createProduct, getAllProducts, getProduct, deleteProduct, updateProductInfo } from '../controllers/productController.js';
import { createReview, getAllReviews, deleteReview, updateReview, getReview }from '../controllers/reviewController.js'
import { protect, checkRole } from '../middleware/authMiddleware.js';
import reviewRouter from './reviewRoutes.js'
const router = express.Router();

// GET /product/:id/reviews
// GET /product/:id/reviews/:id
// POST /product/:id/reviews 

// router.route('/:productId/reviews') .post(protect, createReview);

router.use('/:productId/reviews', reviewRouter)





router.get('/all', getAllProducts);
router.get('/product/:id', getProduct);
router.post('/', protect, checkRole, createProduct);
router.delete('/product/:id/delete', protect, checkRole, deleteProduct);
router.put('/product/:id/update', protect, checkRole, updateProductInfo);

export default router;
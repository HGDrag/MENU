import express from 'express';
import { protect, checkRole } from '../middleware/authMiddleware.js';
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from '../controllers/reviewController.js';
const router = express.Router({ mergeParams: true });

router.get('/all', getAllReviews);
router.post('/',protect, createReview);
router.route('/review/:id')
    .get(getReview)
    .delete(deleteReview)
    .put(updateReview);
// router.delete('/product/:id/delete', protect, checkRole, deleteProduct);
// router.put('/product/:id/update', protect, checkRole, updateProductInfo);

export default router;
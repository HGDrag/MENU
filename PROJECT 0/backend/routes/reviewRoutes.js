import express from 'express';
import { protect, checkOwner} from '../middleware/authMiddleware.js';
import { createReview, deleteReview,
     getAllReviews, getReview, updateReview } from '../controllers/reviewController.js';
     
const router = express.Router({ mergeParams: true });

router.get('/all', getAllReviews);
router.post('/', createReview);
router.route('/review/:id')
    .get(getReview)
    .delete(deleteReview)
    .put(protect, checkOwner, updateReview);

export default router;
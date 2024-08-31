import express from 'express';
import { protect } from '../middleware/authMiddleware.js'
import reviewRouter from './reviewRoutes.js'
import { authUser, registerUser,logoutUser,
    getUserProfile, updateUserProfile} from '../controllers/userController.js';
const router = express.Router();

//USER/REVIEWS/REVIEW/:ID
router.use('/profile/reviews',protect, reviewRouter)

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


export default router;
import express from 'express';
const router = express.Router({ mergeParams: true });
import { authUsers, getUserProfile, createUser, updateUserProfile } from '../controllers/user.js';
import { protect } from '../middleware/auth.js'

router.route('/').post(createUser);
//router.post('/', createUser);
router.post('/login', authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
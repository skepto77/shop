import express from 'express';
const router = express.Router({ mergeParams: true });
import { authUsers, getUserProfile, createUser } from '../controllers/user.js';
import { protect } from '../middleware/auth.js'

router.route('/').post(createUser);
//router.post('/', createUser);
router.post('/login', authUsers);
router.route('/profile').get(protect, getUserProfile);

export default router;
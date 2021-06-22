import express from 'express';
const router = express.Router({ mergeParams: true });
import { 
  authUsers, 
  getUserProfile, 
  createUser, 
  updateUserProfile, 
  getUsers  } from '../controllers/user.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.route('/').post(createUser);
router.get('/', protect, isAdmin,  getUsers );
router.post('/login', authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
import express from 'express';
const router = express.Router({ mergeParams: true });
import { 
  authUsers, 
  getUserProfile, 
  createUser, 
  updateUserProfile, 
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
  } from '../controllers/user.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.route('/').post(createUser);
router.get('/', protect, isAdmin,  getUsers );
router.post('/login', authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .delete(protect, isAdmin, deleteUser)
  .put(protect, isAdmin, updateUserById);

export default router;
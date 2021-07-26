import express from 'express';
const router = express.Router({ mergeParams: true });
import { 
  createOrder,
  getOrderById,
  getOrdersListCurrentUser,
  } from '../controllers/order.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.post('/', protect, createOrder);
router.get('/myorders', protect, getOrdersListCurrentUser);
router.get('/:id', protect, getOrderById);




export default router;
import express from 'express';
const router = express.Router({ mergeParams: true });
import { 
  createOrder,
  getOrderById,
  getOrdersListCurrentUser,
  getOrdersList,
  updateOrderAsPaid,
  updateOrderAsDelivered 
  } from '../controllers/order.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.post('/', protect, createOrder).get('/', protect, isAdmin, getOrdersList);
router.get('/myorders', protect, getOrdersListCurrentUser);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, isAdmin, updateOrderAsPaid);
router.put('/:id/deliver', protect, isAdmin, updateOrderAsDelivered);

export default router;
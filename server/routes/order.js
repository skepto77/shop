import express from 'express';
const router = express.Router({ mergeParams: true });
import { 
  createOrder, 
  } from '../controllers/order.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.post('/', protect, createOrder );

export default router;
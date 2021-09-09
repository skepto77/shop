import express from 'express';
const router = express.Router({ mergeParams: true });
import { getProducts, getProductById, createProductReview } from '../controllers/product.js';
import { protect, isAdmin } from '../middleware/auth.js'

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
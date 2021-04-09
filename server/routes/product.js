import express from 'express';
const router = express.Router({ mergeParams: true });
import Product from '../models/Product.js';

router.get('/', async(req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
      res.status(404).json({ message: `Product not found. Details: ${err}` })
  }
});

export default router;
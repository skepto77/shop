import Product from '../models/Product.js';

const getProducts = async(req, res) => {
  const keyword = req.query.keyword ? {
    title: {
      $regex:  req.query.keyword,
      $options: 'i'
    } 
  } : {};

  const products = await Product.find(keyword);
  res.json(products);
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: `Product not found. Details: ${err}` })
  }
};

export { getProducts, getProductById };
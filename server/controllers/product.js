import Product from '../models/Product.js';

const getProducts = async(req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {
    title: {
      $regex:  req.query.keyword,
      $options: 'i'
    } 
  } : {};

  const countOfProducts = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).skip(pageSize * (page - 1)).limit(pageSize);
  res.json({ products, countOfProducts, pages: Math.ceil(countOfProducts / pageSize), page});
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
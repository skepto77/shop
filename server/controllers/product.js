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

const createProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { rating, comment } = req.body;
    if (product) {
      const existsReview = product.reviews.find((item) => item.user.toString() === req.user._id.toString());
      if(existsReview) {
        throw new Error(`Вы уже оставляли отзыв для этого товара`);
      }
    }
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({ message: `Отзыв добавлен` });
  } catch (err) {
    res.status(400).json({ message: `Ошибка добавления отзыва. ${err}` })
  }
};

export { getProducts, getProductById, createProductReview };
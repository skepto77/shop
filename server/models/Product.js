import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    images: [{
      url: { type: String, required: true },
      source: { type: String, required: true },
    }],
    characteristics: [{
      title: { type: String, required: true },
      items: [{
        name: { type: String, required: true }, 
        value: { type: String, required: true }, 
        isExtended: { type: String}, 
      }],
    }],
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    subcategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    details: [],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema);

export default Product;
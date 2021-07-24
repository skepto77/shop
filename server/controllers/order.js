import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';


const createOrder = asyncHandler(async (req, res) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    shippingPrice, 
    totalPrice 
  } = req.body;
  
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    res.json({ message: 'Отстутвуют товары' });
  } else {
    const order = await Order.create({ 
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice
    });
    res.status(201).json(order);
  }
});

export { createOrder };

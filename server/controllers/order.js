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

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    // console.log(req.params.id, req.user._id)
    // console.log(typeof order.user._id, typeof req.user._id)
    if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
      res.status(201).json(order);
      return;
    }
    res.status(500).json({ message: `Нет прав для просмотра заказа` })
    
  } catch (err) {
    res.status(404).json({ message: `Заказ не найден` })
   }
});

const getOrdersListCurrentUser = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
  } catch (err) {
    res.status(404).json({ message: `Заказы не найдены` })
   }
});

export { createOrder, getOrderById, getOrdersListCurrentUser };

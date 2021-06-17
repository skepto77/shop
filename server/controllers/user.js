import User from '../models/User.js';
import generateToken from '../utilits/genToken.js'
import asyncHandler from 'express-async-handler';

const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error('Неверный email или пароль');
  }

});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  console.log(name, email, password)
  const existsUser = await User.findOne({ email });
  
  if (existsUser) {
    res.status(400);
    throw new Error('Пользователь с таким email уже сществует');
  }

  const user = await User.create({ name, email, password });
  console.log(user)
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Неверные данные пользователя');
  }

});

const getUserProfile = asyncHandler(async (req, res) => {

 const user = await User.findById(req.user._id);

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

});


export { authUsers, getUserProfile, createUser };
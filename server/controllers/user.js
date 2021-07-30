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
    res.json({ message: 'Неверный email или пароль' });
  }

});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const existsUser = await User.findOne({ email });
  
  if (existsUser) {
    res.status(400);
    res.json({ message: 'Пользователь с таким email уже сществует' });
    // throw new Error('Пользователь с таким email уже сществует');
  }
  
  try {
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } 
  }
  catch {
    res.status(400);
    res.json({ message: 'Неверные данные пользователя' });
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


const updateUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);
 
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password) {
      user.password = req.body.password
    }
    const updateUser =  await user.save();

    res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }
 });

 const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({});
 
   if(users) {
     res.json(users);
   } else {
     res.status(404);
     throw new Error('Пользователи не найден');
   }
 
 });

 const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);
 
  if (user) {
    user.remove();
    res.json({ message: 'Пользователь удален' });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }
 });

const getUserById = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      res.json(user);
    } catch {
      res.status(404);
      throw new Error('Пользователь не найден');
    }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updateUser =  await user.save();

    res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      })
    } catch {
      res.status(404);
      throw new Error('Пользователь не найден');
    }
 });

export { authUsers, 
  getUserProfile, 
  createUser, 
  updateUserProfile, 
  getUsers, 
  deleteUser,
  getUserById,
  updateUserById,
 };
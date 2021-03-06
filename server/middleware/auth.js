import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // 'Bearer tokenValue'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Ошибка авторизации, неверный токен');
    }
  }

  if(!token){
    res.status(401);
    throw new Error('Ошибка авторизации, остутствует токен');
  }

});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Нет прав доступа к этому разделу');
  }
}
export { protect, isAdmin };

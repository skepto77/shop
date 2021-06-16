import User from '../models/User.js';

const authUsers = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      psssword: user.password,
      password,
      token: null
    })
  } else {
    res.status(401);
    throw new Error('Неверный email или пароль');
  }

};


export { authUsers };
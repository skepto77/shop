import User from '../models/User.js';

const authUsers = (req, res) => {
  const { email, password } = req.body;
  res.send({email, password});
};


export { authUsers };
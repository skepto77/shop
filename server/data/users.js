import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Alex',
    email: 'alex@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ivan',
    email: 'ivan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
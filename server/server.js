import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import products from './data/products.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();


// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000"],
//     optionsSuccessStatus: 200
//   })
// );


app.get('/', (req, res) => {
  res.send('API');
});

app.get('/api/products/', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT} port`));
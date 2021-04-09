import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/product.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT} port`));
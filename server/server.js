import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname} from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const accessLogStream = fs.createWriteStream(join(__dirname, 'access.log'), { flags: 'a' });
 
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API');
});

app.use('/api/product', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT} port`));
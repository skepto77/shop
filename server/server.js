const express = require('express');
const products = require('./data/products');
const cors = require('cors');

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

app.listen(5000, console.log('server running'));
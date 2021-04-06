import React from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating'

const Product = ({product}) => {
  const {title, price, images, rating, id} = product; 
  const reviews = 0;
  
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/products/${id}`}>
        <Card.Img src={images[0].url} variant='top' />
      </Link>
      <Card.Body>
      <Card.Title as='div'>
        <Link to={`/products/${id}`}>
          <strong>{title}</strong>
        </Link>
      </Card.Title>
      <Card.Text as='h3'>{price} &#8381;</Card.Text>
      <Card.Text><Rating value={rating} text={` ${reviews} отзывов`}/></Card.Text>
      <Button variant="primary">В корзину</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
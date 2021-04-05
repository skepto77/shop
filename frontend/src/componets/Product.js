import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Product = ({product}) => {
  const {title, price, images} = product;
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Img src={images[0].url} variant='top' />
      <Card.Body>
        <Card.Title as='div'>
          <strong>{title}</strong>
        </Card.Title>
        <Card.Text as='h3'>{price} &#8381;</Card.Text>
        <Button variant="primary">В корзину</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
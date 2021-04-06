import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import Rating from '../componets/Rating'
import testData from '../testData';

const ProductPage = () => {
  const { id } = useParams();
  console.log(id);
  const product = testData.find(item => item.id === id); 
  const {title, images, rating, price, description, status} = product;
  const reviews = 0;
  
  return (
    <>
      <Row>
        <Col md={4}>
          <Image src={images[0].url} variant='top' alt={title} fluid className="border"/>
        </Col>
        <Col md={8}>
          <h3>{title}</h3>
          <Rating value={rating} text={` ${reviews} отзывов`}/>
          <h2>{price} &#8381;</h2>
          <p>{(status=== 1) ? 'В наличии': 'Нет в наличии'}</p>
          <Button variant="primary">В корзину</Button>
          <p></p>
          <p>{description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
        </Col>
      </Row>
    </>
  );
};
export default ProductPage;
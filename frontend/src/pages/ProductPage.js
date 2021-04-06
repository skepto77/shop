import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, Button} from 'react-bootstrap';
import Rating from '../componets/Rating'

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [id])

  // const {title, images, rating, price, description, status} = product;
  const reviews = 0;
  
  return (
    <>
      {Object.keys(product).length === 0 ? 'загрузка': (
        <>
          <Row>
            <Col md={4}>
              <Image src={product.images[0].url} variant='top' alt={product.title} fluid className="border"/>
            </Col>
            <Col md={8}>
              <h3>{product.title}</h3>
              <Rating value={product.rating} text={` ${reviews} отзывов`}/>
              <h2>{product.price} &#8381;</h2>
              <p>{(product.status === 1) ? 'В наличии': 'Нет в наличии'}</p>
              <Button variant="primary" disabled={product.status === 0}>В корзину</Button>
              <p></p>
              <p>{product.description}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default ProductPage;
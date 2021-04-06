import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Col, Row, CardGroup } from 'react-bootstrap';
import Product from '../componets/Product';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/`);
      setProducts(data)
    }
    fetchProducts();
  }, [])

  return (
    <>
      <h1>Test Products</h1>
      <Row>
        <CardGroup>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Product product={product} />
            </Col>
          ))}
        </CardGroup>
      </Row>
    </>
  )
}

export default HomePage;
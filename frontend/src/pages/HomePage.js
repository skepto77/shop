import React from 'react';
import { Col, Row, CardGroup } from 'react-bootstrap';
import Product from '../componets/Product';
import testData from '../testData';

const HomePage = () => {
  return (
    <>
      <h1>Test Products</h1>
      <Row>
        <CardGroup>
          {testData.map((product) => (
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
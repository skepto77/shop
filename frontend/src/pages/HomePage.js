import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../componets/Product';

import testData from '../testData';

const HomePage = () => {

  return (
    <>
      <h1>Test Products</h1>
      <Row>
        {testData.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomePage;
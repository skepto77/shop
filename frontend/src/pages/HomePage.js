import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, CardGroup } from 'react-bootstrap';
import Product from '../componets/Product';
import Loader from '../componets/Loader';
import Meta from '../componets/Meta';
import { getProductsList } from '../actions/product';

const HomePage = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  return (
    <>
      <Meta />
      <h1>Test Products</h1>
      { loading 
      ? <Loader />
      : error 
        ? (<h1>{error}</h1>)
        : (
          <Row>
            <CardGroup>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
              ))}
            </CardGroup>
          </Row>
          )
      }
    </>
  )
}

export default HomePage;
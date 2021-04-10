import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Tabs, Tab  } from 'react-bootstrap';
import Rating from '../componets/Rating';
import Loader from '../componets/Loader';
import { getProductDetails } from '../actions/product';

const ProductPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const { loading, error, product = {} } = useSelector((state) => state.productDetails);

   useEffect(() => {
     dispatch(getProductDetails(id));
   }, [id, dispatch]);

  // const {title, images, rating, price, description, status} = product;
  const reviews = 0;
  
  return (
    <>
      {loading ? <Loader /> : error ? (<h3>{error}</h3>): (
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
            </Col>
          </Row>
          <Row  className='mt-5'>
            <Col md={12}>
            <Tabs defaultActiveKey="description" id="uncontrolled-tab-example">
              <Tab eventKey="description" title="О товаре"  >
                <p className='mt-4'>{product.description}</p>
              </Tab>
              <Tab eventKey="characteristics" title="Характеристики">
                {product.characteristics.map((el, i) => {
                  return (
                    <div key={i} className='mt-4'>
                      <h5>{el.title}</h5>
                        {el.items.map((item, j) => (
                          <div key={j}>
                            <dt className="col-sm-4">{item.name}</dt>
                            <dd className="col-sm-8">{item.value}</dd>
                          </div>
                        ))}
                    </div>
                  )
                })}
              </Tab>
            </Tabs>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default ProductPage;
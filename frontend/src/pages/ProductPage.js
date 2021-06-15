import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Tabs, Tab  } from 'react-bootstrap';
import Rating from '../componets/Rating';
import Loader from '../componets/Loader';
import Message from '../componets/Message';
import { getProductDetails } from '../actions/product';
import { addToCart } from '../actions/cart';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const {id} = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
     dispatch(getProductDetails(id));
   }, [dispatch, id]);

  const handlerAddToCart = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  }

  // import Modal from 'react-bootstrap/Modal'
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const reviews = 0;
  
  return (
    <>
      {loading 
          ? <Loader /> 
          : error 
            ? (<h3><Message text={error} variant={'danger'}/></h3>)
            : (
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
              <Button variant="light" onClick={() => setQuantity((quantity) => quantity - 1)} style={{marginRight: '10px'}} disabled={quantity < 2}>-</Button> 
              {quantity}
              <Button variant="light" onClick={() => setQuantity((quantity) => quantity + 1)} style={{marginRight: '10px', marginLeft: '10px'}} disabled={quantity === product.quantity}>+</Button> 
              <Button 
                variant="primary" 
                disabled={product.status === 0}
                onClick={() => handlerAddToCart(id, quantity)}>
                В корзину
              </Button>
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
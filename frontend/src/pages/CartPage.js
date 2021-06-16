import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    
      <Row  className='mt-5'>
        <Col md={12}>
         Корзина
        </Col>
      </Row>

  );
};
export default CartPage;
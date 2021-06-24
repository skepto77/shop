import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Card, Image, Button, ListGroup  } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cart';
import Message from '../componets/Message';

const CartPage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const handlerMinusQuantity = (id, quantity) => {
    quantity =  Number(quantity) - Number(quantity) - 1
    dispatch(addToCart(id, quantity));
  }

  const handlerPlusQuantity = (id, quantity) => {
    quantity =  Number(quantity) - Number(quantity) + 1
    dispatch(addToCart(id, quantity));
  }

  const handlerRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  }

  return (
    <>
      <Row className='mt-1'>
        <Col md={12}>
          <h1>Корзина</h1>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col sm={12} md={8}>
        {!cartItems.length ? (
          <Message variant={'info'}>В корзине нет товаров. <Link to='/'>К покупкам</Link></Message>
          ): (
          <Table  responsive="md">
            <thead>
              <tr>
                <th colSpan="2">Товар</th>
                <th>Цена</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
        
          {cartItems && cartItems.map((item, index) => {
            const {id, image, name, price, quantity} = item;
            return (
              <tr key={index}>
                <td  style={{width: '20%', }}>{image && <Image src={image.url}  alt={name} fluid rounded thumbnail/>}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td style={{whiteSpace: 'nowrap', }}>
                <Button variant="light" size="lg" onClick={() => handlerMinusQuantity(id, quantity)} style={{marginRight: '10px'}} disabled={quantity < 2}>-</Button>
                {quantity}
                <Button variant="light" size="lg" onClick={() => handlerPlusQuantity(id, quantity)} style={{marginLeft: '10px', marginRight: '10px'}} disabled={quantity === product.quantity}>+</Button>
                <Button variant="light" size="lg" onClick={() => handlerRemoveFromCart(id)}><i className="bi bi-trash"></i></Button>
               
                </td>
              </tr>
            )
            })} 
            </tbody>
          </Table>
        )}
        </Col>
        <Col sm={12} md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Ваша корзина</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Доступные способы оплаты и доставки  можно выбрать при оформлении заказа</Card.Subtitle>
          </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Товары: {cartItems.reduce((acc, item) => acc + item.quantity, 0)} шт.</ListGroup.Item>
              <ListGroup.Item>Общая стоимость: {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} ₽</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Link to='/'>
                <Button variant="success" size="lg" disabled={!cartItems.length}>Оформить заказ</Button>
            </Link>
            </Card.Body>
        </Card>  
        </Col>
      </Row>
      </>

  );
};
export default CartPage;
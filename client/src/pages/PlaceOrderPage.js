import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Card, Image, Button, ListGroup  } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createOrder } from '../actions/order';
import CheckoutSteps from '../componets/CheckoutSteps'

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems, shippingAdress, paymentMethod, delivery } = useSelector((state) => state.cart);
 
  // checking completion of previous steps
  useEffect(() => {
    if (!cartItems) {
      history.push('/')
    } else if (!shippingAdress) {
      history.push('/shipping')
    } else if (!paymentMethod) {
      history.push('/payment')
    } else if (!delivery) {
      history.push('/delivery')
    } 
  });

  const { surname, name, country, postalCode, city, address } = useSelector((state) => state.cart.shippingAdress);
 
  let deliveryMethod, deliveryCost;
  delivery && ({ deliveryMethod, deliveryCost} = delivery);
  
  const { order, success } = useSelector((state) => state.order);

  const totalСostItems = cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
  },[order, success, history]);

  const handlerSubmitOrder = () => {
    const order = { 
      orderItems: cartItems,
      shippingAddress: shippingAdress,
      paymentMethod: paymentMethod,
      shippingPrice: deliveryCost,
      totalPrice: totalСostItems
    }
    dispatch(createOrder(order));
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row className='mt-1'>
        <Col md={12}>
          <h1>Оформление заказа</h1>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col sm={12} md={8}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h3>Данные покупателя:</h3>
                  <p>{surname} {name}</p>
                  <p>{country}, {postalCode}, {city}, {address}</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h3>Способ доставки:</h3>
                  {deliveryMethod}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h3>Способ оплаты:</h3>
                  {paymentMethod}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h3>Товары</h3>
                  <Table  striped bordered hover variant="dark">
                    <tbody>
                    {cartItems && cartItems.map((item, index) => {
                      const {image, name, price, quantity} = item;
                      return (
                        <tr key={index}>
                          <td style={{width: '20%', }}>{image && <Image src={image.url}  alt={name} fluid rounded thumbnail/>}</td>
                          <td>{name}</td>
                          <td style={{width: '30%', }}>{quantity} x {price} = {quantity * price}</td>
                        </tr>
                      )
                      })} 
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={12} md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Заказ</Card.Title>
          </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                  Товары:
                  </Col>
                  <Col>
                    {totalСostItems && totalСostItems} ₽
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Стоимость доставки
                  </Col>
                  <Col>
                    {deliveryCost && deliveryCost} ₽
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Итого
                  </Col>
                  <Col>
                    {totalСostItems + deliveryCost} ₽
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="success" size="lg" onClick={handlerSubmitOrder}>Оформить заказ</Button>
            </Card.Body>
        </Card>  
        </Col>
      </Row>
      </>
  );
};
export default PlaceOrderPage;
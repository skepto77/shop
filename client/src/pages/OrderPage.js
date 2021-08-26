import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Card, Image, ListGroup, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getOrderDetails, updateOrderAsPaid, updateOrderAsDelivered } from '../actions/order';
import Loader from '../componets/Loader';
import Message from '../componets/Message';


const OrderPage = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { error: userError, userInfo } = useSelector((state) => state.user);
  const { success: successDeliver } = useSelector((state) => state.orderDeliver);
  const { success: successPay } = useSelector((state) => state.orderPay);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id, successDeliver, successPay]);
  
  const handlerPay = () => {
    dispatch(updateOrderAsPaid(order));
  }

  const handlerDeliver = () => {
    console.log('deliver')
    dispatch(updateOrderAsDelivered(order));
  }

  return (
    <>
      {loading 
        ? <Loader /> 
        : error 
          ? (<h3><Message variant={'danger'}>{error}</Message></h3>)
          : (
            <>
              <Row className='mt-1'>
                <Col md={12}>
                  <h2>Детали заказа № {order._id}</h2>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col sm={12} md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h3>Доставка</h3>
                          <p>Имя: {order.user.name}</p>
                          <p>e-mail: {order.user.email}</p>
                          <p>Адрес: {Object.values(order.shippingAddress).join(', ')}</p> 
                          <Alert variant={order.isDelivered ? "success" : "danger"}>
                            <Alert.Heading>{order.isDelivered ? "Доставлен" : "Не доставлен"}</Alert.Heading>
                            {order.isDelivered &&  (
                              <>
                                <hr/>
                                <p>
                                  Дата доставки: {order.deliveredAt.substring(0, 10)}
                                </p>
                              </>
                            )}
                          </Alert>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h3>Оплата:</h3>
                            <Alert variant={order.isPaid ? "success" : "danger"}>
                              <Alert.Heading>{order.isPaid ? "Оплачен" : "Не оплачен"}</Alert.Heading>
                              <hr />
                              <h5>Способ оплаты:</h5>
                              <p>{order.paymentMethod}</p>
                              {order.isPaid && ( 
                                <>
                                  <hr />
                                  <h5>Дата оплаты</h5>
                                  <p>{order.paidAt.substring(0, 10)}</p>
                                </>
                              )} 
                            </Alert>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h3>Товары</h3>
                          <Table striped bordered hover>
                            <tbody>
                            {order.orderItems && order.orderItems.map((item, index) => {
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
                            {order.totalPrice} ₽
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Стоимость доставки
                          </Col>
                          <Col>
                            {order.shippingPrice} ₽
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Итого
                          </Col>
                          <Col>
                            {order.totalPrice + order.shippingPrice} ₽
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {userInfo.isAdmin && (
                      <ListGroup.Item>
                        <Button variant="success" size="lg" className="btn btn-block" onClick={handlerPay}>Ометить оплаченным</Button>
                        <Button variant="success" size="lg" className="btn btn-block" onClick={handlerDeliver}>Отметить доставленным</Button>
                      </ListGroup.Item>
                      )}
                    </ListGroup>
                </Card>  
                </Col>
              </Row>
            </>
          )
      }
    </>

  );
};
export default OrderPage;
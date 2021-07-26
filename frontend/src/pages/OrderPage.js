import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Card, Image, ListGroup  } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../actions/order';
import Loader from '../componets/Loader';
import Message from '../componets/Message';


const OrderPage = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  console.log(order)
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
                          <p>{!order.isDelivered && <span style={{color: 'red'}}>не доставлен</span>}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h3>Способ оплаты:</h3>
                          <p>{order.paymentMethod}</p>
                          <p>{!order.isPaid && <span style={{color: 'red'}}>не оплачен</span>}</p>
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
import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../actions/user';
import { getOrderListCurrentUser } from '../actions/order';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const history = useHistory();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.user);
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector((state) => state.orderList);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают');

    } else {
      dispatch(updateUser({ id: user._id, name, email, password}));
      setMessage(null);
      setMessageSuccess('Данные сохранены');
    }

  }

  useEffect(() => {
    if(!userInfo) {
      history.push('/login');
    } else {
        if (!user || !user.name) {
        dispatch(getUserDetails());
        dispatch(getOrderListCurrentUser());
      } else {
        setName(user.name);
        setEmail(user.email);
      }

    }
  },[history, userInfo, user, dispatch])

  return (
    <>
    {loading && <Loader />} 
    {message &&  <Message variant={'danger'}>{message}</Message>}
    {error && <Message variant={'danger'}>{error}</Message>}
    {messageSuccess && !message &&  <Message variant={'success'}>{messageSuccess}</Message>}
      <Row className='mt-5 justify-content-md-center'>
        <Col md={3} xs={12}>
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
              <Form.Label>Имя</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите имя" 
                value={name}
                onChange={(e)=>setName(e.target.value)}  
                />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Введите email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}  
                />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Введите пароль" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}  
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Подтверждение пароля</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Подтвердите пароль" 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}  
              />
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              Сохранить
            </Button>
          </Form>
        </Col>
        <Col md={9} xs={12}>
          <h3>Мои заказы</h3> 
          {loadingOrders 
            ? <Loader /> 
            : errorOrders  
              ? (<h3><Message variant={'danger'}>{errorOrders }</Message></h3>)
              : (
          <Table responsive="md">
            <thead>
              <tr>
                <th>ID2</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Оплачен</th>
                <th>Доставлен</th>
              </tr>
            </thead>
            <tbody>
        
          {orders && orders
            .sort((a, b) =>  Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map((item, index) => {
            const {_id, createdAt, totalPrice, isPaid, isDelivered} = item;
            return (
              <tr key={index}>
                <td>{_id}</td>
                <td>{createdAt.substring(0, 10)}</td>
                <td>{totalPrice}</td>
                <td>{!isPaid ? <i class="bi bi-x lg" style={{color: 'red',fontSize: '40px',  }}></i> : <i className="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i>}</td>
                <td>{!isDelivered? <i class="bi bi-x lg" style={{color: 'red',fontSize: '40px',  }}></i> : <i className="bi bi-check lg" style={{color: 'green',fontSize: '40px',  }}></i>}</td>
                <td>
                <Button variant="light" size="lg" onClick={() => ''} style={{marginRight: '10px'}} disabled>подробности</Button>
                </td>
              </tr>
                )
                })} 
                </tbody>
              </Table>
            )}
        </Col>
      </Row>

    </>
  );
};
export default LoginPage;
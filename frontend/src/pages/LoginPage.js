import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../actions/user';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  },[history, redirect, userInfo])

  return (
    <>
    {loading && <Loader />} 
    {error &&  <Message variant={'danger'}>{error}</Message>}
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
          <Form onSubmit={submitHandler}>
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
            <Button variant="primary" size="lg" type="submit">
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
            <Link to='/register'>
               Регистрация
            </Link>
        </Col>
      </Row>

    </>
  );
};
export default LoginPage;
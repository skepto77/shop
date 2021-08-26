import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { register } from '../actions/user';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const { loading, error, userInfo } = useSelector((state) => state.userRegister);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают');
    } else {
      dispatch(register(name, email, password));
    }

  }

  useEffect(() => {
    if(userInfo) {
      history.push('/');
    }
  },[history, userInfo])

  return (
    <>
    {loading && <Loader />} 
    {message &&  <Message text={message} variant={'danger'}/>}
    {error &&  <Message text={error} variant={'danger'}/>}
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
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
            <Button variant="primary" type="submit">
              Регистрация
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
            Уже зарегистрированы?{' '}
            <Link to='/login'>
               Войти
            </Link>
        </Col>
      </Row>

    </>
  );
};
export default LoginPage;
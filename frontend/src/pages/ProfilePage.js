import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../actions/user';
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
            <Button variant="primary" size="lg" type="submit">
              Сохранить
            </Button>
          </Form>
        </Col>
      </Row>

    </>
  );
};
export default LoginPage;
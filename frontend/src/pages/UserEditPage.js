import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { getUserDetails, updateUserById } from '../actions/user';
import Loader from '../componets/Loader';
import Message from '../componets/Message';

const UserEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const history = useHistory();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.user);
 
  useEffect(() => {
    if(!userInfo) {
      history.push('/login');
    } else {
        if (user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      }

    }
  },[history, userInfo, user, id, dispatch])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserById({ id, name, email, isAdmin}));
    setMessage(null);
    setMessageSuccess('Данные сохранены');
  }

  return (
    <>
    {loading && <Loader />} 
    {message &&  <Message variant={'danger'}>{message}</Message>}
    {error && <Message variant={'danger'}>{error}</Message>}
    {messageSuccess && !message &&  <Message variant={'success'}>{messageSuccess}</Message>}
      <Row className='mt-5 justify-content-md-center'>
        <Col md={3} xs={12}>
        <h2>Редактирование данных пользователя</h2>
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
            <Form.Group controlId="admin">
              <Form.Check 
                type="checkbox" 
                label="Администратор" 
                checked={isAdmin}
                onChange={(e)=>setAdmin(e.target.checked)}  
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
export default UserEditPage;
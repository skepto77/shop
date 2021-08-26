import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { getUserById, updateUserById } from '../actions/user';

import Loader from '../componets/Loader';
import Message from '../componets/Message';

const UserEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const history = useHistory();
  const { goBack } = useHistory();
  const { loading, error, user } = useSelector((state) => state.userDetailsById);

  let { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = useSelector((state) => state.userUpdateById);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserById(id));
    } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
    }
  }, [history, user, id, dispatch]);

  // clean message box when unmount
  useEffect(() => {
    return () => {
      setMessage(false);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserById({_id: id, name, email, isAdmin}));
    setMessage(successUpdate);
  }

  return (
    <>
      <Row className='justify-content-md-center text-center'>
        <Col md={12} xs={12}>
        <button className="btn btn-light" onClick={goBack}>назад</button>
        <h3 className="mt-5 mb-5">Редактирование данных пользователя</h3>
        </Col>
      </Row>
      {loading && !loadingUpdate && <Loader />} 
      {loadingUpdate && <Loader />} 
      {error && <Message variant={'danger'}>{error}</Message>}
      {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
      {message &&  <Message variant={'success'}>Данные сохранены</Message>}
      <Row className='justify-content-md-center'>
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
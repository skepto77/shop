import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from '../componets/CheckoutSteps'


const ShippingPage = () => {
  const { shippingAdress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [surname, setSurname] = useState(shippingAdress.surname);
  const [name, setName] = useState(shippingAdress.name);
  const [country, setCountry] = useState(shippingAdress.country);
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
  const [city, setCity] = useState(shippingAdress.city);
  const [address, setAddress] = useState(shippingAdress.address);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ surname, name, country, postalCode, city, address }));
    history.push('/delivery')
  }

  return (
    <>
    <CheckoutSteps step1></CheckoutSteps>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
        <h1>Данные покупателя</h1>
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="surname">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите фамилию" 
                value={surname}
                onChange={(e)=>setSurname(e.target.value)}  
                />
            </Form.Group>
          <Form.Group controlId="name">
              <Form.Label>Имя</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите имя" 
                value={name}
                onChange={(e)=>setName(e.target.value)}  
                />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Страна</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите страну" 
                value={country}
                onChange={(e)=>setCountry(e.target.value)}  
                />
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Индекс</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите индекс" 
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}  
                />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Город</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите город" 
                value={city}
                onChange={(e)=>setCity(e.target.value)}  
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Улица, дом, квартира</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Введите улицу, дом, номер квартиры" 
                value={address}
                onChange={(e)=>setAddress(e.target.value)}  
              />
            </Form.Group>
            <Button variant="success" size="lg" type="submit">
              Продолжить
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ShippingPage;
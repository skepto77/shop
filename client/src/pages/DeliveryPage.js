import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { saveDeliveryMethod } from '../actions/cart';
import CheckoutSteps from '../componets/CheckoutSteps'


const DeliveryPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { delivery } = useSelector((state) => state.cart)
  const [deliveryMethod, setDeliveryMethod] = useState(delivery ? delivery.deliveryMethod : null);
  const [deliveryCost, setDeliveryCost] = useState(delivery ? delivery.deliveryCost : null);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryMethod({ deliveryMethod, deliveryCost }));
    history.push('/login?redirect=payment')
  }

  return (
    <>
      <CheckoutSteps step1 step2/>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
           <h1>Способ доставки</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">
                Выберите способ доставки
              </Form.Label>
              <Col>
                <Form.Check type="radio" id="postOffice">
                  <Form.Check.Input
                    type="radio"
                    name="deliveryMethod"
                    value="Доставка компанией «Почта РФ»"
                    checked={deliveryMethod === "Доставка компанией «Почта РФ»"}
                    onChange={(e)=> {
                    setDeliveryMethod(e.target.value);
                    setDeliveryCost(250);
                    }  
                  }
                  />
                  <Form.Check.Label>Доставка компанией «Почта РФ»</Form.Check.Label>
                  <Form.Control.Feedback style={{display: 'block', font:'bold 14px/2 sans-serif', color:'#999' }}>Срок доставки: 2–6 рабочих дней</Form.Control.Feedback>
                </Form.Check>
                <Form.Check type="radio" id="pickup">
                  <Form.Check.Input
                    type="radio"
                    name="deliveryMethod"
                    value="Самовывоз из магазина"
                    checked={deliveryMethod === "Самовывоз из магазина"}
                    onChange={(e)=> {
                    setDeliveryMethod(e.target.value);
                    setDeliveryCost(0);
                    }  
                  }
                  />
                  <Form.Check.Label>Самовывоз из магазина</Form.Check.Label>
                  <Form.Control.Feedback style={{display: 'block', font:'bold 14px/2 sans-serif', color:'#999' }}>проезд Стратонавтов, 10</Form.Control.Feedback>
                </Form.Check>
                <Form.Check type="radio" id="courierDelivery">
                  <Form.Check.Input
                    type="radio"
                    name="deliveryMethod"
                    value="Доставка курьером"
                    checked={deliveryMethod === "Доставка курьером"}
                    onChange={(e)=> {
                    setDeliveryMethod(e.target.value);
                    setDeliveryCost(300);
                    }  
                  }
                  />
                  <Form.Check.Label>Доставка курьером</Form.Check.Label>
                  <Form.Control.Feedback style={{display: 'block', font:'bold 14px/2 sans-serif', color:'#999' }}>До 2.0 км от метро, далее 50 руб за каждый км</Form.Control.Feedback>
                </Form.Check>
              </Col>
            </Form.Group>
            <Button variant="primary" size="lg" onClick={() => history.goBack()}>
              Назад
            </Button>
            {' '}
            <Button variant="success" size="lg" type="submit" disabled ={!deliveryMethod} >
              Продолжить
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default DeliveryPage;
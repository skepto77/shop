import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cart';
import CheckoutSteps from '../componets/CheckoutSteps'


const PaymentPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState(useSelector((state) => state.cart.paymentMethod));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/login?redirect=placeorder')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3/>
      <Row className='mt-5 justify-content-md-center'>
        <Col md={6} xs={12}>
           <h1>Способ оплаты</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">
                Выберите способ оплаты
              </Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Наличные"
                  name="paymentMethod"
                  id="cash"
                  value="Наличные"
                  checked={paymentMethod === "Наличные"}
                  onChange={(e)=> {
                    setPaymentMethod(e.target.value);
                    }  
                  }
                />
                <Form.Check
                  type="radio"
                  label="Предоплата"
                  name="paymentMethod"
                  id="prepayment"
                  value="Предоплата"
                  checked={paymentMethod === "Предоплата"}
                  onChange={(e)=> {
                    setPaymentMethod(e.target.value);
                    }  
                  }
                />
              </Col>
            </Form.Group>
            <Button variant="primary" size="lg" onClick={() => history.goBack()}>
              Назад
            </Button>
            {' '}
            <Button variant="success" size="lg" type="submit" disabled ={!paymentMethod} >
              Продолжить
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default PaymentPage;
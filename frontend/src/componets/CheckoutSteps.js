import React from 'react';
import { useSelector } from 'react-redux';
import { Nav} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';


const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav variant="pills" defaultActiveKey="/shipping" className="justify-content-center">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/shipping">
              <Nav.Link eventKey="link-1">Данные покупателя</Nav.Link>
            </LinkContainer>
            ) : <Nav.Link  eventKey="link-1"disabled>Данные покупателя</Nav.Link>
          }
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/delivery">
              <Nav.Link eventKey="link-2">Способ доставки</Nav.Link>
            </LinkContainer>
            ) : <Nav.Link  eventKey="link-2" disabled>Способ доставки</Nav.Link>
          }
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link eventKey="link-3">Способ оплаты</Nav.Link>
            </LinkContainer>
            ) : <Nav.Link  eventKey="link-3" disabled>Способ оплаты</Nav.Link>
          }
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link eventKey="link-4">Подтверждение заказа</Nav.Link>
            </LinkContainer>
            ) : <Nav.Link eventKey="link-4" disabled>Подтверждение заказа</Nav.Link>
          }
        </Nav.Item>
    </Nav>
  )
};

export default CheckoutSteps;
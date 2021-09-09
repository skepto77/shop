import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Popup = (props) => {
  return (
    <Modal {...props}>
    <Modal.Header closeButton>
      <Modal.Title>{props.header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.content}</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={props.onHide}>
        Продолжить покупки
      </Button>
      <Button href="/cart" variant="success">
        Перейти в корзину
      </Button>
    </Modal.Footer>
    </Modal>
  )
}

export default Popup;
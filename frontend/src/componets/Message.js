import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert  } from 'react-bootstrap';

const Message = ({ variant, text }) => {

  return (
    <Row>
      <Col>
        <Alert variant={variant}>{text}</Alert>
      </Col>
    </Row>
  );
};

Message.defaultProps = {
  variant: 'danger',
  text: 'error',
};

Message.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Message;
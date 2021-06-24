import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert  } from 'react-bootstrap';

const Message = ({ variant, children }) => {

  return (
    <Row className='mt-2 justify-content-md-center'>
      <Col md={8} xs={12}>
        <Alert variant={variant} className='text-center'>{children}</Alert>
      </Col>
    </Row>
  );
};

Message.defaultProps = {
  variant: 'danger',
  text: 'error',
};

Message.propTypes = {
  variant: PropTypes.string.isRequired
}

export default Message;
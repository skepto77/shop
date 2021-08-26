import React, { useState } from 'react';
import { Row, Col, Form, Button  } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [ keyword, setKeyword ] = useState('');

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/?text=${keyword.trim()}`);
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row className='mb-5 justify-content-md-center'>
        <Col xs={8} sm={9} md={8} lg={8}>
            <Form.Group controlId="keyword">
              <Form.Control 
                type="text" 
                placeholder="Поиск товаров" 
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}  
                className='mr-sm-2  ml-sm-5'
                />
            </Form.Group>
            </Col>
          <Col xs="auto">
              <Button variant="light" type="submit" className='mr-sm-5' >
              Поиск
            </Button>
          </Col>
    
      </Row>
    </Form>
  )
}


export default Search;
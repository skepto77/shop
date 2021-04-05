import React from 'react';
import { Navbar, Container} from 'react-bootstrap';

const Header = () => {
  return (
    <header className="shadow-sm mb-5 bg-white rounded">
      <Navbar variant="light" bg="light">
        <Container>
            <Navbar.Brand>
              <img
                alt=""
                src="https://react-bootstrap.github.io/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Shop
            </Navbar.Brand>
            <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '7px', color: '#000', fontSize: '16px'}}>
                  <h5>
                    <i className="bi bi-person" style={{marginRight: '7px'}}></i>
                    <i className="bi bi-cart" style={{marginRight: '7px'}}></i>
                  </h5>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
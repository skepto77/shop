import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const quantityOfItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="shadow-sm mb-5 bg-white rounded">
      <Navbar variant="light" bg="light">
        <Container>
            <LinkContainer to="/">
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
            </LinkContainer>
            <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
              <Nav className="ml-auto">
                <Navbar.Text style={{marginRight: '7px', color: '#000', fontSize: '16px'}}>
                  <LinkContainer to="/personal">
                    <Nav.Link>
                      <i className="bi bi-person" style={{marginRight: '7px'}}></i>  Войти
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="bi bi-cart" style={{marginRight: '7px'}}></i> Корзина ({quantityOfItems})
                    </Nav.Link>
                  </LinkContainer>
                </Navbar.Text>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
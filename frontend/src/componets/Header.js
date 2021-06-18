import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const quantityOfItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logoutHandler = () => {
    dispatch(logout());
  }

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
            <Nav className="justify-content-end">
              {userInfo ? 
                <>
                <Nav.Item>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="bi bi-person-circle" style={{marginRight: '10px', fontSize: '20px'}}></i>{userInfo.name}
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer  to="/logout">
                    <Nav.Link onClick={logoutHandler}>
                    <i className="bi bi-arrow-right-circle" style={{marginRight: '10px', fontSize: '20px'}}></i>Выйти
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                </>
                :
                <Nav.Item>
                <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="bi bi-person" style={{marginRight: '10px', fontSize: '20px'}}></i>Войти
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                }
                <Nav.Item>
                  <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="bi bi-cart-fill" style={{marginRight: '7px', fontSize: '20px'}}></i>({quantityOfItems})
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
            </Nav>
        </Container>
      </Navbar>
    </header>
  )
};

export default Header;
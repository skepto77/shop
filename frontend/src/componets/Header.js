import React from 'react';
// import Route from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
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
    <>
    <header className="mb-5 bg-white">
      <Navbar variant="light" className="bg-white shadow-sm">
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
                      <i className="bi bi-person-circle" style={{marginRight: '10px'}}></i>{userInfo.name}
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              {userInfo.isAdmin && (
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="adminMenu">
                    <i className="bi bi-list"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <LinkContainer to="/admin/orders/">
                      <Dropdown.Item>Заказы</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products/">
                      <Dropdown.Item>Товары</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users/">
                      <Dropdown.Item>Пользователи</Dropdown.Item>
                    </LinkContainer>
                  </Dropdown.Menu>
                </Dropdown>
                )}
                <Nav.Item>
                  <LinkContainer  to="/logout">
                    <Nav.Link onClick={logoutHandler}>
                    <i className="bi bi-arrow-right-circle" style={{marginRight: '10px'}}></i>Выйти
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                </>                
                :
                <Nav.Item>
                <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="bi bi-person" style={{marginRight: '10px'}}></i>Войти
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                }
                <Nav.Item>
                  <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="bi bi-cart" style={{marginRight: '7px'}}></i>({quantityOfItems})
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
            </Nav>
        </Container>
      </Navbar>
    </header>
    <Search />
    </>
  )
};

export default Header;
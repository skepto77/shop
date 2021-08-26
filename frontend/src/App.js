import React from 'react';
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import { Container} from 'react-bootstrap';
import Header from './componets/Header';
import Footer from './componets/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import DeliveryPage from './pages/DeliveryPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderListPage from './pages/OrderListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import PageNotFound from './pages/PageNotFound';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3' style={{ minHeight: 'calc(100vh - 170px)'}}>
        <Container>
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/page/:pageNumber"><HomePage /></Route>
            <Route exact path="/search"><SearchPage /></Route>
            <Route path="/search/page/:pageNumber"><SearchPage /></Route>
            <Route path="/product/:id"><ProductPage /></Route>
            <Route path="/cart"><CartPage /></Route>
            <Route path="/shipping"><ShippingPage /></Route>
            <Route path="/delivery"><DeliveryPage /></Route>
            <Route path="/payment"><PaymentPage /></Route>
            <Route path="/placeorder"><PlaceOrderPage /></Route>
            <Route path="/order/:id"><OrderPage /></Route>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterPage /></Route>
            <Route path="/profile"><ProfilePage /></Route>
            <Route exact path="/admin/users"><UserListPage /></Route>
            <Route path="/admin/users/:id/edit"><UserEditPage /></Route>
            <Route exact path="/admin/orders/"><OrderListPage /></Route>
            <Route path="/admin/orders/page/:pageNumber"><OrderListPage /></Route>
            <Route><PageNotFound /></Route>
           </Switch>
        </Container>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;

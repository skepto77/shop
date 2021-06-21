import { createStore} from 'redux';
import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/product';
import { cart } from './reducers/cart';
import { userLogin, userRegister, userDetails, userUpdate } from './reducers/user';

const reducers = combineReducers({
  productList,
  productDetails,
  cart,
  user: userLogin,
  userRegister,
  userDetails,
  userUpdate,

});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

const userFromLocalStorage = localStorage.getItem('user') 
? JSON.parse(localStorage.getItem('user')) 
: null;

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage }, 
  user: { userInfo: userFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(
      ...middleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

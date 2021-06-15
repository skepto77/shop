import { createStore} from 'redux';
import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/product';
import { cart } from './reducers/cart';


const reducers = combineReducers({
  productList,
  productDetails,
  cart
});

const cartItems = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

const initialState = {
  cart: { cartItems }, 
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

import { createStore} from 'redux';
import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {product} from './reducers/product';

const reducers = combineReducers({
    product,
});

const initialState = {};

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

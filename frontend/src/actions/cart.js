
import axios from 'axios';
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
} from '../constants/cart';


const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios(`/api/product/${id}`);

    dispatch({ 
      type: CART_ADD_ITEM, 
      payload: {
        image: data.images[0],
        id: data._id,
        name: data.title,
        price: data.price,
        quantity
      } });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

  } catch (error) {
    console.log(error)
  }
};

const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: CART_REMOVE_ITEM, 
      payload: id,
      });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

  } catch (error) {
    console.log(error)
  }
};

export { addToCart, removeFromCart };

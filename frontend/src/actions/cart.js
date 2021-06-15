
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
        product: data._id,
        name: data.title,
        price: data.price,
        quantity
      } });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

  } catch (error) {
    console.log(error)
  }
};

export { addToCart };

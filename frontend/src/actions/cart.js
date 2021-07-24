
import axios from 'axios';
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_DELIVERY_METHOD,
  CART_SAVE_PAYMENT_METHOD,
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

const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({ 
      type: CART_SAVE_SHIPPING_ADDRESS, 
      payload: data,
      });
    localStorage.setItem('shippingAdress', JSON.stringify(data));
  } catch (error) {
    console.log(error)
  }
};

const saveDeliveryMethod = (data) => async (dispatch) => {
  try {
    dispatch({ 
      type: CART_SAVE_DELIVERY_METHOD, 
      payload: data,
      });
    localStorage.setItem('deliveryMethod', JSON.stringify(data));
  } catch (error) {
    console.log(error)
  }
};

const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({ 
      type: CART_SAVE_PAYMENT_METHOD, 
      payload: data,
      });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  } catch (error) {
    console.log(error)
  }
};

export { 
  addToCart, 
  removeFromCart, 
  saveShippingAddress,  
  saveDeliveryMethod,
  savePaymentMethod,
};

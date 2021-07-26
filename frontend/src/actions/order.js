import axios from 'axios';
import { 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_LIST_CURRENT_USER_REQUEST,
  ORDER_LIST_CURRENT_USER_SUCCESS,
  ORDER_LIST_CURRENT_USER_FAILURE,
} from '../constants/order';

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { user: { userInfo: { token } } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

  } catch (error) {
    console.log(error)
    dispatch({ 
      type: ORDER_CREATE_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    
    const { user: { userInfo: { token } } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type: ORDER_DETAILS_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const getOrderListCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_CURRENT_USER_REQUEST });
    
    const { user: { userInfo: { token } } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: ORDER_LIST_CURRENT_USER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type: ORDER_LIST_CURRENT_USER_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export { createOrder, getOrderDetails, getOrderListCurrentUser};

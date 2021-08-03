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
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAILURE,
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

const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    
    const { user: { userInfo: { token } } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type: ORDER_LIST_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const updateOrderAsPaid = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(`/api/orders/${order._id}/pay`, {}, config);

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   ORDER_PAY_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const updateOrderAsDelivered = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   ORDER_DELIVER_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export { 
  createOrder, 
  getOrderDetails, 
  getOrderListCurrentUser, 
  getOrderList, 
  updateOrderAsPaid, 
  updateOrderAsDelivered,
 };

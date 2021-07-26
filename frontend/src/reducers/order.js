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

const orderCreate = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return { 
        order: payload,
        loading: false,
        success: true,
      };
    case ORDER_CREATE_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const orderDetails = (state = {order: {}, loading: true}, { type, payload }) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return { 
        order: payload,
        loading: false,
      };
    case ORDER_DETAILS_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const orderListCurrentUser = (state = {orders: []}, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_CURRENT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_CURRENT_USER_SUCCESS:
      return { 
        orders: payload,
        loading: false,
      };
    case ORDER_LIST_CURRENT_USER_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { orderCreate, orderDetails, orderListCurrentUser };
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

const orderList = (state = {orders: []}, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return { 
        orders: payload,
        loading: false,
      };
    case ORDER_LIST_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};


const orderPay = (state = {order: {}}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return { 
        success: true,
        loading: false,
      };
    case ORDER_PAY_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const orderDeliver = (state = {order: {}}, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return { 
        success: true,
        loading: false,
      };
    case ORDER_DELIVER_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { 
  orderCreate, 
  orderDetails, 
  orderListCurrentUser, 
  orderList, 
  orderPay, 
  orderDeliver 
};
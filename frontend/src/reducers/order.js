import { 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
} from '../constants/order';

const createOrder = (state = {}, { type, payload }) => {
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

export { createOrder };
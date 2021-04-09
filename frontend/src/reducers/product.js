import { 
  PRODUCTS_REQUEST, 
  PRODUCTS_REQUEST_FAIL, 
  PRODUCTS_LOADED 
} from '../constants/product';

const product = (state = { products: [] }, { type, payload }) => {

  switch (type) {
    case PRODUCTS_REQUEST:
      return {
        products:  [],
        loading: true,
      };
    case PRODUCTS_LOADED:
      return { 
        products: payload,
        loading: false,
      };
    case PRODUCTS_REQUEST_FAIL:
      return {
        products: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { product };

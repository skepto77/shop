import { 
  PRODUCTS_REQUEST, 
  PRODUCTS_REQUEST_FAIL, 
  PRODUCTS_LOADED,
  PRODUCT_REQUEST, 
  PRODUCT_REQUEST_FAIL, 
  PRODUCT_LOADED 
} from '../constants/product';

const productList = (state = { products: [] }, { type, payload }) => {
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

const productDetails = (state = { product: {} }, { type, payload }) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return {
        product:  {},
        loading: true,
      };
    case PRODUCT_LOADED:
      return { 
        product: payload,
        loading: false,
      };
    case PRODUCT_REQUEST_FAIL:
      return {
        product: {},
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { productList, productDetails };

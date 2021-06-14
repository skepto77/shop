import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE, 
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE, 

} from '../constants/product';

const productList = (state = { products: [] }, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        products:  [],
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return { 
        products: payload,
        loading: false,
      };
    case PRODUCT_LIST_FAILURE:
      return {
        products: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const productDetails = (state = { product: {}, loading: true }, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return { 
        product: payload,
        loading: false,
      };
    case PRODUCT_DETAILS_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { productList, productDetails };

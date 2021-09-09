import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE, 
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE, 
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_RESET,

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
        products: payload.products,
        countOfProducts: payload.countOfProducts,
        pages: payload.pages,
        page: payload.page,
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

const productCreateReview = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { 
        success: true,
        loading: false,
      };
    case PRODUCT_CREATE_REVIEW_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export { productList, productDetails, productCreateReview };

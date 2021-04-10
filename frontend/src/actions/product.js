import axios from 'axios';
import { 
  PRODUCTS_REQUEST, 
  PRODUCTS_REQUEST_FAIL, 
  PRODUCTS_LOADED,
  PRODUCT_REQUEST, 
  PRODUCT_REQUEST_FAIL, 
  PRODUCT_LOADED 
} from '../constants/product';

const getProductsList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_REQUEST, payload: [] });

    const { data } = await axios(`/api/products/`);

    dispatch({ type: PRODUCTS_LOADED, payload: data });
  } catch (error) {
    dispatch({ 
      type: PRODUCTS_REQUEST_FAIL, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST, payload: {} });

    const { data } = await axios(`/api/products/${id}`);

    dispatch({ type: PRODUCT_LOADED, payload: data });
  } catch (error) {
    dispatch({ 
      type: PRODUCT_REQUEST_FAIL, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export {getProductsList, getProductDetails};


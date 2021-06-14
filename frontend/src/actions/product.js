import axios from 'axios';
import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE, 
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from '../constants/product';

const getProductsList = () => async (dispatch) => {
  try {
    dispatch({ type:   PRODUCT_LIST_REQUEST, payload: [] });

    const { data } = await axios(`/api/product/`);

    dispatch({ type:   PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type:   PRODUCT_LIST_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: {} });

    const { data } = await axios(`/api/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: PRODUCT_DETAILS_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export {getProductsList, getProductDetails};


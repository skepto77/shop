import axios from 'axios';
import { 
  PRODUCTS_REQUEST, 
  PRODUCTS_REQUEST_FAIL, 
  PRODUCTS_LOADED 
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


export {getProductsList};


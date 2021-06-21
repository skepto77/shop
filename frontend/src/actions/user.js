import axios from 'axios';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE, 
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../constants/user';

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type:  USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const { data } = await axios.post(`/api/users/login`, { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data));

  } catch (error) {
    dispatch({ 
      type:   USER_LOGIN_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type:  USER_LOGOUT });
  localStorage.removeItem('user');
};

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const { data } = await axios.post(`/api/users`, { name, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data));

  } catch (error) {
    dispatch({ 
      type:   USER_REGISTER_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};


const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/users/profile`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   USER_DETAILS_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   USER_UPDATE_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};


export { login, logout, register, getUserDetails, updateUser };

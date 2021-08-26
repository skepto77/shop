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
  USER_DETAILS_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_BY_ID_REQUEST,
  USER_UPDATE_BY_ID_SUCCESS,
  USER_UPDATE_BY_ID_FAILURE,
  // USER_UPDATE_BY_ID_RESET,
  // USER_GET_BY_ID_REQUEST,
  USER_GET_BY_ID_SUCCESS,
  USER_GET_BY_ID_FAILURE,
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
      type: USER_LOGIN_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
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

const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   USER_LIST_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const data = await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type:   USER_DELETE_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};


const getUserById = (id) => async (dispatch, getState) => {
  try { 

    const { user: { userInfo: { token } } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: USER_GET_BY_ID_SUCCESS, payload: data});

  } catch (error) {
    dispatch({ 
      type: USER_GET_BY_ID_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};


const updateUserById = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_BY_ID_REQUEST });

    const { user: { userInfo: { token } } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_BY_ID_SUCCESS });
    dispatch({ type: USER_GET_BY_ID_SUCCESS, payload: data});
    // dispatch({ type: USER_UPDATE_BY_ID_RESET });

  } catch (error) {
    dispatch({ 
      type: USER_UPDATE_BY_ID_FAILURE, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export { 
  login, 
  logout, 
  register, 
  getUserDetails, 
  updateUser, 
  getUserList, 
  deleteUser, 
  updateUserById,
  getUserById
};

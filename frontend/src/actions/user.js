import axios from 'axios';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE, 
  USER_LOGOUT,
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
}

const logout = () => async (dispatch) => {
  dispatch({ type:  USER_LOGOUT });
  localStorage.removeItem('user');
}

export { login, logout };

import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE, 
  USER_LOGOUT,
} from '../constants/user';

const userLogin = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return { 
        userInfo: payload,
        loading: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        error: payload,
        loading: false,
      };
      case USER_LOGOUT:
        return {};
    default:
      return state;
  }
};

export { userLogin };
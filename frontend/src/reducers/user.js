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

const userRegister = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return { 
        userInfo: payload,
        loading: false,
      };
    case USER_REGISTER_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const userDetails = (state = { user1: {} }, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return { 
        user: payload,
        loading: false,
      };
    case USER_DETAILS_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const userUpdate = (state = { }, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return { 
        user: payload,
        loading: false,
      };
    case USER_UPDATE_FAILURE:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};


export { userLogin, userRegister, userDetails, userUpdate };
import {
  LOGOUT,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "./auth.type";

const initialstate = {
  isAuth: false,
  token: "",
  name: "",
  email: "",
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        name: payload.name,
        email: payload.email,
        isAuth: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USER_LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: false };
    case LOGOUT:
      return initialstate;
    default:
      return state;
  }
};

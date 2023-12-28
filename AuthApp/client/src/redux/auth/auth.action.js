import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "./auth.type";

const BASE_URL = "https://expensive-worm-sari.cyclic.app/";

const loginRequestAction = () => {
  return { type: USER_LOGIN_REQUEST };
};

const loginSuccessAction = (payload) => {
  return { type: USER_LOGIN_SUCCESS, payload };
};

const registerSuccessAction = () => {
  return { type: USER_SIGNUP_SUCCESS };
};

const loginFailureAction = () => {
  return { type: USER_LOGIN_FAILURE };
};

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequestAction());

  try {
    const res = await axios.post(`${BASE_URL}/user/login`, userData);

    if (res.data.msg === "Login Successfull") {
      dispatch(
        loginSuccessAction({ token: res.data.token, email: userData.email })
      );
      return { status: res.status, msg: res.data.msg };
    } else {
      dispatch(loginFailureAction());
      return { status: res.status, msg: res.data.msg };
    }
  } catch (error) {
    dispatch(loginFailureAction());
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(loginRequestAction());
  console.log(1)

  console.log(userData)
  try {
    const res = await axios.post(`${BASE_URL}/user/register`, userData);
    if (res.status===200) {
      dispatch(
        registerSuccessAction()
      );
      return { status: res.status, msg: res.data.msg };
    } else {
      dispatch(loginFailureAction());
      return { status: res.status, msg: res.data.msg };
    }
  } catch (error) {
    dispatch(loginFailureAction());
  }
};

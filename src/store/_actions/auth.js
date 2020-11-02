import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (res) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: res,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (experationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, experationTime * 1000);
  };
};

export const auth = (userDetails, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isSignup ? 'signUp' : 'signInWithPassword'
        }?key=AIzaSyB_dXisfEJds5fJUnvoxV5MqBmhgK3ShDk`,
        {
          ...userDetails,
          returnSecureToken: true,
        },
      )
      .then((res) => {
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

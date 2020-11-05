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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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
        }
      )
      .then((res) => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const tokenExpiresIn = new Date(localStorage.getItem('expirationDate'));
      if (tokenExpiresIn > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({ idToken: token, localId: userId }));
        dispatch(checkAuthTimeout((tokenExpiresIn.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};

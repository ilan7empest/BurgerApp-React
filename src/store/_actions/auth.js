import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};
export const signupSuccess = (res) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    token: res.idToken,
  };
};
export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error,
  };
};

export const signup = (userDetails) => {
  return (dispatch) => {
    dispatch(signupStart());
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_dXisfEJds5fJUnvoxV5MqBmhgK3ShDk',
        userDetails,
      )
      //   .post('user.json', userDetails)
      .then((res) => {
        console.log(res);
        dispatch(signupSuccess(res.data));
      })
      .catch((err) => dispatch(signupFail(err)));
  };
};

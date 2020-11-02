import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const signupSuccess = (res) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: res,
  };
};
export const signupFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (userDetails, isSignup) => {
  return (dispatch) => {
    dispatch(signupStart());
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isSignup ? 'signUp' : 'signInWithPassword'
        }?key=AIzaSyB_dXisfEJds5fJUnvoxV5MqBmhgK3ShDk`,
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

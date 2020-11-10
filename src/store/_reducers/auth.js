import * as actionTypes from '../_actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authSucess = (state, action) => {
  return updateObject(state, {
    loading: false,
    tokenId: action.token,
    userId: action.userId,
    error: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        loading: true,
        error: null,
      });
    case actionTypes.AUTH_SUCCESS:
      return authSucess(state, action);

    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.LOGOUT: {
      return updateObject(state, {
        tokenId: null,
        userId: null,
      });
    }
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;

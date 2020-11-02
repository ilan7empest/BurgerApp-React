import * as actionTypes from '../_actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
};

const authSucess = (state, action) => {
  return updateObject(state, {
    loading: false,
    tokenId: action.data.idToken,
    userId: action.data.localId,
    error: null,
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
    default:
      return state;
  }
};

export default reducer;

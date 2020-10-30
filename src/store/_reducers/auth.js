import * as actionTypes from '../_actions/actionTypes';

const initialState = {
  tokenId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenId: action.token,
        error: null,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;

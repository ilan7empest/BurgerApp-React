import reducer from './auth';

import * as actionTypes from '../_actions/actionTypes';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      tokenId: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
  it('should store token upon login', () => {
    expect(
      reducer(
        {
          tokenId: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          userId: 'user-id',
        }
      )
    ).toEqual({
      tokenId: 'some-token',
      userId: 'user-id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});

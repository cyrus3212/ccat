import { authLogout } from '../utils/Auth/Auth';

import {
  AUTH_LOGOUT,
} from '../actionTypes';

const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

function logout(state) {
  state = Object.assign({}, state, {
    isAuthenticated: false,
  });

  authLogout().then(res => {
    // console.log('logout: ', res);
  })
  return state;
}

export default reducer;

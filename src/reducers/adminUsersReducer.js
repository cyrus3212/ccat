import {
  ADMIN_USER_LIST, ADMIN_USER_FETCH, ADMIN_USER_REMOVE
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ADMIN_USER_LIST:
      return list(payload);
    case ADMIN_USER_FETCH:
      return fetch(payload);
    case ADMIN_USER_REMOVE:
      return remove(payload);
    default:
      return state;
  }
};

function list(payload) {
  return Object.assign({}, payload);
}

function fetch(payload) {
  return Object.assign({}, payload);
}

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id);

  return Object.assign({}, state, { data });
}

export default reducer;

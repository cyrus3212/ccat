import {
  ENTERPRISE_ADD,
  ENTERPRISE_UPDATE,
  ENTERPRISE_REMOVE,
  ENTERPRISE_LIST,
  ENTERPRISE_FETCH,
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ENTERPRISE_FETCH:
      return payload;
    case ENTERPRISE_ADD:
      return payload;
    case ENTERPRISE_UPDATE:
      return payload;
    case ENTERPRISE_REMOVE:
      return remove(state, payload);
    case ENTERPRISE_LIST:
      return list(payload);
    default:
      return state;
  }
};

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id);

  return Object.assign({}, state, { data });
}

function list(payload) {
  return Object.assign({}, payload);
}

export default reducer;

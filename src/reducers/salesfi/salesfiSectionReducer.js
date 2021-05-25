import {
  SALES_FI_SECTION_FETCH,
  SALES_FI_LIST_REMOVE
} from '../../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case SALES_FI_SECTION_FETCH:
      return fetch(payload);
    case SALES_FI_LIST_REMOVE:
      return remove(state, payload);
    default:
      return state;
  }
};

function fetch(payload) {
  return Object.assign({}, payload);
}

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id);
  return Object.assign({}, state, { data });
}

export default reducer;

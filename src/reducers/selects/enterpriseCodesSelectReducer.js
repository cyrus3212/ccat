import {
  ENTERPRISE_CODE_SELECT_LIST,
} from '../../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ENTERPRISE_CODE_SELECT_LIST:
      return list(payload);
    default:
      return state;
  }
};

function list(payload) {
  return Object.assign({}, payload);
}

export default reducer;

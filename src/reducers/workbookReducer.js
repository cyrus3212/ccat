import {
  WORKBOOK_LIST,
  WORKBOOK_FETCH,
} from '../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case WORKBOOK_FETCH:
      return list(payload);
    case WORKBOOK_LIST:
      return list(payload);
    default:
      return state;
  }
};

function list(payload) {
  return Object.assign({}, payload);
}

export default reducer;

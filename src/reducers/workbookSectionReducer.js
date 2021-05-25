import {
  WORKBOOK_SECTION_FETCH,
  WORKBOOK_SECTION_ADD,
  WORKBOOK_SECTION_UPDATE
} from '../actionTypes';

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case WORKBOOK_SECTION_FETCH:
      return fetch(payload);
    case WORKBOOK_SECTION_ADD:
      return fetch(payload);
    case WORKBOOK_SECTION_UPDATE:
      return fetch(payload);
    default:
      return state;
  }
};

function fetch(payload) {
  return Object.assign({}, payload);
}

export default reducer;

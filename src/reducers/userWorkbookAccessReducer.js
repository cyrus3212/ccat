import {
  USER_ACCESS_WORKBOOK_FETCH
} from '../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case USER_ACCESS_WORKBOOK_FETCH:
      return payload;
    default:
      return state;
  }
};

export default reducer;

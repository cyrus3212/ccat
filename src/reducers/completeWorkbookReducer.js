import {
  WORKBOOK_COMPLETE,
} from '../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case WORKBOOK_COMPLETE:
      return payload;
    default:
      return state;
  }
};

export default reducer;

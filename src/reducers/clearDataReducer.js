import {
  CLEAR_DATA,
} from '../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case CLEAR_DATA:
      return payload;
    default:
      return state;
  }
};

export default reducer;

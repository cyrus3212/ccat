import {
  USER_STORE_LIST,
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case USER_STORE_LIST:
      return payload;
    default:
      return state;
  }
};

export default reducer;

import {
  USER_FETCH_DETAIL
} from '../actionTypes';

const initialState = { data: [] };

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case USER_FETCH_DETAIL:
      return payload;
    default:
      return state;
  }
};

export default reducer;

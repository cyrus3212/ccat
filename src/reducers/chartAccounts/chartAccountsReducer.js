import {
  UPDATE_REVIEW_ACCOUNTS,
  ADD_REVIEW_ACCOUNTS
} from '../../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case UPDATE_REVIEW_ACCOUNTS:
      return payload;
    case ADD_REVIEW_ACCOUNTS:
      return payload;
    default:
      return state;
  }
};

export default reducer;

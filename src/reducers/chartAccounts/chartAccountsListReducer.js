import {
  REVIEW_ACCOUNTS_LIST,
  UPDATE_REVIEW_ACCOUNTS_LIST
} from '../../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case REVIEW_ACCOUNTS_LIST:
      return list(payload);
    case UPDATE_REVIEW_ACCOUNTS_LIST:
      return payload;
    default:
      return state;
  }
};

function list(payload) {
  return Object.assign({}, payload);
}

export default reducer;

import {
  BATCH_UPDATE_BY_FIELD,
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case BATCH_UPDATE_BY_FIELD:
      return payload;
    default:
      return state;
  }
};

export default reducer;

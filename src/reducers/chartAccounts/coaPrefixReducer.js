import {
  SET_COA_PREFIX
} from '../../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case SET_COA_PREFIX:
      return payload;
    default:
      return state;
  }
};

export default reducer;

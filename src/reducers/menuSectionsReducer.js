import {
  MENU_SECTION_LIST,
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case MENU_SECTION_LIST:
      return payload;
    default:
      return state;
  }
};

export default reducer;

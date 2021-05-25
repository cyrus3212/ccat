import {
  USER_SELECT_LIST,
} from '../../actionTypes';

// Load users list on search
export function list(payload) {
  return {
    type: USER_SELECT_LIST,
    payload
  };
}

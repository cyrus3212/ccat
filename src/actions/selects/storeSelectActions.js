import {
  STORE_SELECT_LIST,
} from '../../actionTypes';

// Load store select list
export function list(payload) {
  return {
    type: STORE_SELECT_LIST,
    payload
  };
}

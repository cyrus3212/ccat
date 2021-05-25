import {
  USER_STORE_LIST,
} from '../actionTypes';

export function list(payload) {
  return {
    type: USER_STORE_LIST,
    payload
  };
}

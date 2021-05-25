import {
  MENU_LIST,
} from '../actionTypes';

export function list(payload) {
  return {
    type: MENU_LIST,
    payload
  };
}

import {
  MENU_SECTION_LIST,
} from '../actionTypes';

export function list(payload) {
  return {
    type: MENU_SECTION_LIST,
    payload
  };
}

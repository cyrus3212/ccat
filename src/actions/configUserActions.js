import {
  CONFIG_USER_LIST
} from '../actionTypes';

export function list(payload) {
  return {
    type: CONFIG_USER_LIST,
    payload
  };
}

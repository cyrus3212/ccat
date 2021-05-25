import {
  ADMIN_USER_LIST,
  ADMIN_USER_FETCH,
  ADMIN_USER_REMOVE
} from '../actionTypes';

export function list(payload) {
  return {
    type: ADMIN_USER_LIST,
    payload
  };
}

export function fetch(payload) {
  return {
    type: ADMIN_USER_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: ADMIN_USER_REMOVE,
    payload
  };
}

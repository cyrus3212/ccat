import {
  SERVICE_SECTION_FETCH,
  SERVICE_LIST_REMOVE
} from '../../actionTypes';

export function fetch(payload) {
  return {
    type: SERVICE_SECTION_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: SERVICE_LIST_REMOVE,
    payload
  };
}

import {
  PARTS_SECTION_FETCH,
  PARTS_LIST_REMOVE
} from '../../actionTypes';

export function fetch(payload) {
  return {
    type: PARTS_SECTION_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: PARTS_LIST_REMOVE,
    payload
  };
}

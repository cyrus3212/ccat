import {
  SALES_FI_SECTION_FETCH,
  SALES_FI_LIST_REMOVE
} from '../../actionTypes';

export function fetch(payload) {
  return {
    type: SALES_FI_SECTION_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: SALES_FI_LIST_REMOVE,
    payload
  };
}

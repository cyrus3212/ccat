import {
  ACCOUNTING_SECTION_FETCH,
  ACCOUNTING_LIST_REMOVE
} from '../../actionTypes';

export function fetch(payload) {
  return {
    type: ACCOUNTING_SECTION_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: ACCOUNTING_LIST_REMOVE,
    payload
  };
}

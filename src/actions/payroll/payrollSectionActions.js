import {
  PAYROLL_SECTION_FETCH,
  PAYROLL_LIST_REMOVE
} from '../../actionTypes';

export function fetch(payload) {
  return {
    type: PAYROLL_SECTION_FETCH,
    payload
  };
}

export function remove(payload) {
  return {
    type: PAYROLL_LIST_REMOVE,
    payload
  };
}

import {
  PAYROLL_SECTION_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: PAYROLL_SECTION_LIST,
    payload
  };
}


import {
  ACCOUNTING_SECTION_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: ACCOUNTING_SECTION_LIST,
    payload
  };
}


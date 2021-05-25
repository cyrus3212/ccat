import {
  SALES_FI_SECTION_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: SALES_FI_SECTION_LIST,
    payload
  };
}


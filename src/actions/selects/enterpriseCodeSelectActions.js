import {
  ENTERPRISE_CODE_SELECT_LIST,
} from '../../actionTypes';

// Load enterprise code list
export function list(payload) {
  return {
    type: ENTERPRISE_CODE_SELECT_LIST,
    payload
  };
}

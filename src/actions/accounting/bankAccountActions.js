import {
  BANK_ACCOUNT_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: BANK_ACCOUNT_LIST,
    payload
  };
}

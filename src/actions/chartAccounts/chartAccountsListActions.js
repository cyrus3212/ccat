import {
  REVIEW_ACCOUNTS_LIST,
  UPDATE_REVIEW_ACCOUNTS_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: REVIEW_ACCOUNTS_LIST,
    payload
  };
}

export function update(payload) {
  return {
    type: UPDATE_REVIEW_ACCOUNTS_LIST,
    payload
  };
}

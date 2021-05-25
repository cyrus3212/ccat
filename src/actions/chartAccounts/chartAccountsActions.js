import {
  ADD_REVIEW_ACCOUNTS,
  UPDATE_REVIEW_ACCOUNTS
} from '../../actionTypes';

export function add(payload) {
  return {
    type: ADD_REVIEW_ACCOUNTS,
    payload
  };
}

export function update(payload) {
  return {
    type: UPDATE_REVIEW_ACCOUNTS,
    payload
  };
}

import {
  USER_ACCESS_WORKBOOK_FETCH
} from '../actionTypes';

export function fetch(payload) {
  return {
    type: USER_ACCESS_WORKBOOK_FETCH,
    payload
  };
}

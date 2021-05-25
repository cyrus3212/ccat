import {
  CLEAR_DATA,
} from '../actionTypes';

export function clearData(payload) {
  return {
    type: CLEAR_DATA,
    payload
  };
}

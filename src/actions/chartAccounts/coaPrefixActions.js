import {
  SET_COA_PREFIX
} from '../../actionTypes';

export function setCoaPrefix(payload) {
  return {
    type: SET_COA_PREFIX,
    payload
  };
}

import {
  USER_FETCH_DETAIL
} from '../actionTypes';

/**
 * Function used to fetch user detail information
 *
 * @param {*} payload
 */
export function fetchProfile(payload) {
  return {
    type: USER_FETCH_DETAIL,
    payload
  };
}

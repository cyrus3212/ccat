import {
  WORKBOOK_LIST,
  WORKBOOK_FETCH,
  WORKBOOK_COMPLETE,
} from '../actionTypes';

export function list(payload) {
  return {
    type: WORKBOOK_LIST,
    payload
  };
}

export function fetch(payload) {
  return {
    type: WORKBOOK_FETCH,
    payload
  };
}

export function complete(payload) {
  return {
    type: WORKBOOK_COMPLETE,
    payload
  };
}

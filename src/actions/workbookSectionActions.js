import {
  WORKBOOK_SECTION_FETCH,
  WORKBOOK_SECTION_ADD,
  WORKBOOK_SECTION_UPDATE,
} from '../actionTypes';

export function fetch(payload) {
  return {
    type: WORKBOOK_SECTION_FETCH,
    payload
  };
}

export function add(payload) {
  return {
    type: WORKBOOK_SECTION_ADD,
    payload
  };
}

export function update(payload) {
  return {
    type: WORKBOOK_SECTION_UPDATE,
    payload
  };
}

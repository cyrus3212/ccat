import {
  PARTS_SECTION_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: PARTS_SECTION_LIST,
    payload
  };
}


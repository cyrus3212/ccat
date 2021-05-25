import {
  SERVICE_SECTION_LIST,
} from '../../actionTypes';

export function list(payload) {
  return {
    type: SERVICE_SECTION_LIST,
    payload
  };
}


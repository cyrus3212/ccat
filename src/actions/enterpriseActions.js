import {
  ENTERPRISE_LIST,
  ENTERPRISE_ADD,
  ENTERPRISE_REMOVE,
  ENTERPRISE_UPDATE,
  ENTERPRISE_FETCH,
} from '../actionTypes';

// Load enterprises
export function list(payload) {
  return {
    type: ENTERPRISE_LIST,
    payload
  };
}

export function fetch(payload) {
  return {
    type: ENTERPRISE_FETCH,
    payload
  };
}

export function add(payload) {
  return {
    type: ENTERPRISE_ADD,
    payload
  };
}

export function remove(payload) {
  return {
    type: ENTERPRISE_REMOVE,
    payload
  };
}

export function update(payload) {
  return {
    type: ENTERPRISE_UPDATE,
    payload
  };
}

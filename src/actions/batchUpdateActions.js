import {
  BATCH_UPDATE_BY_FIELD,
} from '../actionTypes';

export function batchUpdateByField(payload) {
  return {
    type: BATCH_UPDATE_BY_FIELD,
    payload
  };
}

import {
  EXPORT_DATA_TRANSACTION,
  IMPORT_DATA_TRANSACTION,
  FETCH_DATA_TRANSACTION,
  PROCESS_COPY_DATA,
  SAVE_DATA_TRANSACTION
} from '../actionTypes';

export function fetchImport(payload) {
  return {
    type: IMPORT_DATA_TRANSACTION,
    payload
  };
}

export function fetchExport(payload) {
  return {
    type: EXPORT_DATA_TRANSACTION,
    payload
  };
}

export function fetchDataTransaction(payload) {
  return {
    type: FETCH_DATA_TRANSACTION,
    payload
  };
}

export function saveDataTransaction(payload) {
  return {
    type: SAVE_DATA_TRANSACTION,
    payload
  };
}

export function copyData(payload) {
  return {
    type: PROCESS_COPY_DATA,
    payload
  };
}
